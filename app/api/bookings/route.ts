import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendBookingEmail } from "@/app/actions";

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

    await sendBookingEmail(booking);

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
