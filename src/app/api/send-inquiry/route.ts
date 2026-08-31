import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env["RESEND_API_KEY"]);

/** Server-side schema — mirrors the client-side one. */
const inquirySchema = z.object({
  name: z.string().trim().nonempty().max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().nonempty().max(1000),
  vehicleLabel: z.string().trim().max(150).optional().or(z.literal("")),
});

const TO_EMAIL = "info@autolink.ae";
const FROM_EMAIL = "AutoLink Inquiry <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { name, email, phone, message, vehicleLabel } = parsed.data;

  const subject = vehicleLabel
    ? `Vehicle Inquiry — ${vehicleLabel}`
    : "Vehicle Inquiry — AutoLink";

  const htmlBody = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin-top:0;border-bottom:2px solid #e5e7eb;padding-bottom:12px">
        New Vehicle Inquiry
      </h2>
      ${vehicleLabel ? `<p><strong>Vehicle:</strong> ${vehicleLabel}</p>` : ""}
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
      <p style="white-space:pre-wrap">${message}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("[Resend] send error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Resend] unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
