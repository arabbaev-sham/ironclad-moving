import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendBookingEmail } from "@/app/actions";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const str = (key: string) => String(formData.get(key) || "");

    const booking = {
      // contact
      name:               str("name"),
      email:              str("email"),
      phone:              str("phone"),
      // job
      job_type:           str("job_type"),
      type_of_job:        str("type_of_job") || null,
      crew_count:         str("crew_count"),
      estimated_time:     str("estimated_time"),
      loading_address:    str("loading_address"),
      unloading_address:  str("unloading_address"),
      job_date:           str("job_date"),
      need_truck:         str("need_truck")  || null,
      heavy_items:        str("heavy_items") || null,
      // legacy columns (keep NOT NULL satisfied)
      move_type:          str("job_type"),
      move_date:          str("job_date"),
      pickup_address:     str("loading_address"),
      destination_address: str("unloading_address"),
      status:             "pending" as const,
      photo_urls:         [] as string[],
    };

    if (!booking.name || !booking.email || !booking.phone || !booking.job_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error("[bookings] Supabase error:", JSON.stringify(error));
      return NextResponse.json({ error: "Failed to save booking", details: error.message }, { status: 500 });
    }

    console.log("[bookings] Saved id:", data.id);
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
