import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const esc = (s: string = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (typeof email !== "string" || !email) {
    return NextResponse.json({ error: "כתובת אימייל חסרה" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "כתובת אימייל לא תקינה" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
  } catch (verifyErr) {
    console.error("[newsletter] SMTP verify failed:", verifyErr);
    return NextResponse.json({ error: "SMTP connection failed" }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from: `"POLARIZED-X Website" <noreply@polarizedx.co.il>`,
      to: process.env.SMTP_USER!,
      replyTo: email,
      subject: `רישום חדש לניוזלטר – ${email}`,
      text: `נרשם חדש לרשימת התפוצה: ${email}`,
      html: `
        <div dir="rtl" style="font-family:sans-serif;font-size:16px">
          <h2>רישום חדש לניוזלטר</h2>
          <p><strong>אימייל:</strong> ${esc(email)}</p>
        </div>
      `,
    });
  } catch (sendErr) {
    console.error("[newsletter] sendMail failed:", sendErr);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
