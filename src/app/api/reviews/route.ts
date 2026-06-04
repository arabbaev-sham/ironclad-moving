import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const review = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      rating: Number(formData.get("rating") || 0),
      text: String(formData.get("text") || ""),
      move_type: String(formData.get("moveType") || ""),
      approved: false,
      image_urls: [] as string[],
    };

    if (!review.name || !review.text || review.rating < 1) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (review.rating > 5 || review.rating < 1) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    console.log("[reviews] Inserting review from:", review.name);

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert([review])
      .select()
      .single();

    if (error) {
      console.error("[reviews] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to save review", details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log("[reviews] Saved successfully, id:", data.id);

    // Notify admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.COMPANY_EMAIL!,
      subject: `New Review Submitted — ${review.rating}★ from ${review.name}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Review Pending Approval</h2>
          <p><strong>Name:</strong> ${review.name}</p>
          <p><strong>Rating:</strong> ${"⭐".repeat(review.rating)}</p>
          <p><strong>Move Type:</strong> ${review.move_type || "Not specified"}</p>
          <p><strong>Review:</strong> ${review.text}</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/reviews">Approve in Admin Dashboard</a></p>
        </div>
      `,
    }).catch(console.error);

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  const isAdmin = adminKey === process.env.ADMIN_SECRET_KEY;

  const query = supabaseAdmin.from("reviews").select("*").order("created_at", { ascending: false });
  if (!isAdmin) query.eq("approved", true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, approved } = await req.json();
  const { error } = await supabaseAdmin
    .from("reviews")
    .update({ approved })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
