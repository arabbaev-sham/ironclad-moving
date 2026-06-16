"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.RESEND_FROM_EMAIL ?? "noreply@ironcladmovingllc.com";
const TO     = process.env.COMPANY_EMAIL     ?? "ironcladmov@gmail.com";

const row = (label: string, value: string | null | undefined) =>
  value
    ? `<tr>
        <td style="padding:7px 0;color:#6b7280;width:150px;vertical-align:top">${label}</td>
        <td style="padding:7px 0;color:#111;font-weight:600">${value}</td>
       </tr>`
    : "";

export async function sendBookingEmail(b: {
  name: string;
  email: string;
  phone: string;
  job_type: string;
  type_of_job?: string | null;
  crew_count: string;
  estimated_time: string;
  loading_address: string;
  unloading_address: string;
  job_date: string;
  need_truck?: string | null;
  heavy_items?: string | null;
}) {
  const isMoving = b.job_type === "Moving Help";

  const results = await Promise.allSettled([
    // ── Notification to company ──
    resend.emails.send({
      from: FROM,
      to:   TO,
      subject: `🚛 New Request: ${b.name} — ${b.job_type}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:32px;border-radius:12px;">
          <div style="background:#059669;padding:20px 24px;border-radius:8px;margin-bottom:24px;">
            <h1 style="margin:0;color:#fff;font-size:20px;">New Booking Request</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">IronClad Moving</p>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            ${row("Job Type",         b.job_type)}
            ${row("Name",             b.name)}
            ${row("Phone",            b.phone)}
            ${row("Email",            b.email)}
            ${row("Crew Count",       b.crew_count)}
            ${row("Estimated Time",   b.estimated_time)}
            ${row("Loading Address",  b.loading_address)}
            ${row("Unloading Address",b.unloading_address)}
            ${row("Date",             b.job_date)}
            ${isMoving ? row("Needs Truck?",  b.need_truck)  : ""}
            ${isMoving ? row("Heavy Items?",  b.heavy_items) : ""}
            ${!isMoving ? row("Type of Job",  b.type_of_job) : ""}
          </table>
          <p style="color:#9ca3af;font-size:12px;margin-top:8px;">IronClad Moving · 2200 W Meeker St, Kent, WA</p>
        </div>
      `,
    }),

    // ── Confirmation to customer ──
    resend.emails.send({
      from: FROM,
      to:   b.email,
      subject: "Request Received — IronClad Moving",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#060e22;color:#fff;padding:32px;border-radius:16px;">
          <div style="background:linear-gradient(135deg,#059669,#10b981);padding:24px;border-radius:12px;margin-bottom:24px;text-align:center;">
            <h1 style="margin:0;font-size:22px;color:#fff;">Request Received!</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);">IronClad Moving</p>
          </div>
          <p>Hi ${b.name},</p>
          <p style="color:#8899b8;">We've received your request and will confirm within <strong style="color:#fff;">1 hour</strong>.</p>
          <div style="background:#0a1628;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;margin:16px 0;">
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">Job Type:</strong> ${b.job_type}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">Date:</strong> ${b.job_date}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">From:</strong> ${b.loading_address}</p>
            <p style="margin:6px 0;color:#8899b8;"><strong style="color:#fff;">To:</strong> ${b.unloading_address}</p>
          </div>
          <p style="color:#8899b8;">Questions? Call us at <a href="tel:12066084987" style="color:#10b981;">+1 206-608-4987</a></p>
          <p style="color:#555;font-size:13px;margin-top:24px;">IronClad Moving · 2200 W Meeker St, Kent, WA</p>
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
