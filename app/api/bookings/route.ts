import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const booking = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      move_type: String(formData.get("moveType") || ""),
      move_date: String(formData.get("moveDate") || ""),
      pickup_address: String(formData.get("pickupAddress") || ""),
      pickup_floor: String(formData.get("pickupFloor") || "Ground"),
      destination_address: String(formData.get("destinationAddress") || ""),
      destination_floor: String(formData.get("destinationFloor") || "Ground"),
      notes: String(formData.get("notes") || ""),
      status: "pending" as const,
      photo_urls: [] as string[],
    };

    if (!booking.name || !booking.email || !booking.phone || !booking.move_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("[bookings] Inserting booking for:", booking.name);

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error("[bookings] Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to save booking", details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log("[bookings] Saved successfully, id:", data.id);

    const resend = getResend();
    await Promise.allSettled([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "ironcladmov@gmail.com",
        to: booking.email,
        subject: "Booking Request Received — IronClad Movers",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#060e22;color:#fff;padding:32px;border-radius:16px;">
            <div style="background:linear-gradient(135deg,#d4a843,#e8c052);padding:24px;border-radius:12px;margin-bottom:24px;text-align:center;">
              <h1 style="margin:0;font-size:24px;color:#060e22;">Booking Request Received!</h1>
              <p style="margin:8px 0 0;color:#060e22;opacity:0.8;">IronClad Movers</p>
            </div>
            <p>Hi ${booking.name},</p>
            <p style="color:#8899b8;">We've received your booking request and will confirm within 1 hour.</p>
            <div style="background:#0a1628;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;margin:16px 0;">
              <p style="margin:4px 0;color:#8899b8;"><strong style="color:#fff;">Move Type:</strong> ${booking.move_type}</p>
              <p style="margin:4px 0;color:#8899b8;"><strong style="color:#fff;">Date:</strong> ${booking.move_date}</p>
              <p style="margin:4px 0;color:#8899b8;"><strong style="color:#fff;">From:</strong> ${booking.pickup_address}</p>
              <p style="margin:4px 0;color:#8899b8;"><strong style="color:#fff;">To:</strong> ${booking.destination_address}</p>
            </div>
            <p style="color:#8899b8;">Questions? Call us at <a href="tel:12066084987" style="color:#d4a843;">+1 206-608-4987</a></p>
            <p style="color:#555;font-size:13px;margin-top:24px;">IronClad Movers · 2200 W Meeker St, Kent, WA</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "ironcladmov@gmail.com",
        to: process.env.COMPANY_EMAIL ?? "ironcladmov@gmail.com",
        subject: `New Booking: ${booking.name} — ${booking.move_type}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
            <h2>New Booking Request</h2>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Move Type:</strong> ${booking.move_type}</p>
            <p><strong>Date:</strong> ${booking.move_date}</p>
            <p><strong>From:</strong> ${booking.pickup_address} (${booking.pickup_floor})</p>
            <p><strong>To:</strong> ${booking.destination_address} (${booking.destination_floor})</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ""}
          </div>
        `,
      }),
    ]);

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error("[bookings] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
