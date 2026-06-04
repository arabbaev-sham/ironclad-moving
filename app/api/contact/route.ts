import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("[contact] Inserting message from:", name);

    const { error: dbError } = await supabaseAdmin.from("contact_messages").insert([{
      name, email, phone, subject, message, status: "unread",
    }]);

    if (dbError) {
      console.error("[contact] Supabase insert error:", JSON.stringify(dbError));
    } else {
      console.log("[contact] Saved to DB successfully");
    }

    await Promise.allSettled([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject: "We received your message — Seattle Prime Movers",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 24px; border-radius: 12px; text-align: center; color: white;">
              <h1 style="margin: 0;">Message Received!</h1>
            </div>
            <p>Hi ${name}, thanks for reaching out to Seattle Prime Movers.</p>
            <p>We'll respond within 1 business hour. For urgent moves, call us at <strong>206-609-5878</strong>.</p>
            <p style="color: #6b7280; font-size: 14px;">Seattle Prime Movers · 4317 8th Avenue NE, Seattle, WA</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.COMPANY_EMAIL!,
        subject: `New Contact: ${subject} — ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
