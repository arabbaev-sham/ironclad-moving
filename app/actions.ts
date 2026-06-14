"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@ironcladmovingllc.com";
const TO = process.env.COMPANY_EMAIL ?? "ironcladmov@gmail.com";

export async function sendBookingEmail(booking: {
  name: string;
  email: string;
  phone: string;
  move_type: string;
  move_date: string;
  pickup_address: string;
  pickup_floor: string;
  destination_address: string;
  destination_floor: string;
  notes?: string;
}) {
  const results = await Promise.allSettled([
    // Notification to company
    resend.emails.send({
      from: FROM,
      to: TO,
      subject: `🚛 New Booking: ${booking.name} — ${booking.move_type}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:12px;">
          <div style="background:#059669;padding:20px 24px;border-radius:8px;margin-bottom:24px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">New Booking Request</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${booking.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;font-weight:600;color:#111;">${booking.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111;">${booking.email}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Move Type</td><td style="padding:8px 0;color:#111;">${booking.move_type}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">Move Date</td><td style="padding:8px 0;font-weight:600;color:#059669;">${booking.move_date}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">From</td><td style="padding:8px 0;color:#111;">${booking.pickup_address} (${booking.pickup_floor})</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">To</td><td style="padding:8px 0;color:#111;">${booking.destination_address} (${booking.destination_floor})</td></tr>
            ${booking.notes ? `<tr><td style="padding:8px 0;color:#6b7280;">Notes</td><td style="padding:8px 0;color:#111;">${booking.notes}</td></tr>` : ""}
          </table>
          <p style="margin-top:24px;color:#6b7280;font-size:13px;">IronClad Movers · 2200 W Meeker St, Kent, WA</p>
        </div>
      `,
    }),

    // Confirmation to customer
    resend.emails.send({
      from: FROM,
      to: booking.email,
      subject: "Booking Request Received — IronClad Movers",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#060e22;color:#fff;padding:32px;border-radius:16px;">
          <div style="background:linear-gradient(135deg,#d4a843,#e8c052);padding:24px;border-radius:12px;margin-bottom:24px;text-align:center;">
            <h1 style="margin:0;font-size:22px;color:#060e22;">Booking Request Received!</h1>
            <p style="margin:8px 0 0;color:#060e22;opacity:0.8;">IronClad Movers</p>
          </div>
          <p>Hi ${booking.name},</p>
          <p style="color:#8899b8;">We've received your booking request and will confirm within 1 hour.</p>
          <div style="background:#0a1628;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;margin:16px 0;">
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">Move Type:</strong> ${booking.move_type}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">Date:</strong> ${booking.move_date}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">From:</strong> ${booking.pickup_address}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">To:</strong> ${booking.destination_address}</p>
          </div>
          <p style="color:#8899b8;">Questions? Call us at <a href="tel:12066084987" style="color:#d4a843;">+1 206-608-4987</a></p>
          <p style="color:#555;font-size:13px;margin-top:24px;">IronClad Movers · 2200 W Meeker St, Kent, WA</p>
        </div>
      `,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[sendBookingEmail] email ${i} failed:`, r.reason);
    }
  });
}

export async function sendQuoteEmail(data: {
  job_type: string;
  type_of_job?: string | null;
  crew_count: string;
  estimated_time: string;
  loading_address: string;
  unloading_address: string;
  job_date: string;
  need_truck?: string | null;
  heavy_items?: string | null;
  name: string;
  email: string;
  phone: string;
}) {
  const row = (label: string, value: string | null | undefined) =>
    value
      ? `<tr>
          <td style="padding:7px 0;color:#6b7280;width:150px;vertical-align:top">${label}</td>
          <td style="padding:7px 0;color:#111;font-weight:500">${value}</td>
        </tr>`
      : "";

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:12px;">
      <div style="background:#ea580c;padding:20px 24px;border-radius:8px;margin-bottom:24px;">
        <h1 style="margin:0;color:#fff;font-size:20px;">New Quote Request</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">IronClad Moving</p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        ${row("Job Type", data.job_type)}
        ${row("Type of Job", data.type_of_job)}
        ${row("Crew Count", data.crew_count)}
        ${row("Estimated Time", data.estimated_time)}
        ${row("Loading Address", data.loading_address)}
        ${row("Unloading Address", data.unloading_address)}
        ${row("Date", data.job_date)}
        ${data.job_type === "Moving Help" ? row("Needs Truck?", data.need_truck) : ""}
        ${data.job_type === "Moving Help" ? row("Heavy Items?", data.heavy_items) : ""}
      </table>

      <div style="border-top:1px solid #e5e7eb;padding-top:16px;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:.05em;">Contact</p>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", data.name)}
          ${row("Phone", data.phone)}
          ${row("Email", data.email)}
        </table>
      </div>

      <p style="margin-top:24px;color:#9ca3af;font-size:12px;">IronClad Moving · 2200 W Meeker St, Kent, WA</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: "New Quote Request - IronClad Moving",
    html,
  });

  if (result.error) {
    console.error("[sendQuoteEmail] failed:", result.error);
  }
}
