import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, mode } = body;

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const isRegister = mode === "register";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "medium",
      timeStyle: "short",
    });

    await transporter.sendMail({
      from: `"Thetix Portal" <${process.env.GOOGLE_EMAIL}>`,
      to: process.env.GOOGLE_EMAIL,
      subject: isRegister
        ? `[Thetix] New tutor signup — ${name}`
        : `[Thetix] Portal login attempt — ${email}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #09090b; color: #f1f5f9; padding: 32px; max-width: 480px; border-radius: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 28px;">
            <div style="width: 24px; height: 24px; background: #dc2626; border-radius: 5px;"></div>
            <span style="font-size: 13px; font-weight: 600; color: #fafafa; letter-spacing: -0.01em;">Thetix</span>
            <span style="font-size: 9px; color: #52525b; background: #18181b; border: 0.5px solid #27272a; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.06em;">Tutor Portal</span>
          </div>

          <div style="font-size: 18px; font-weight: 600; color: #fafafa; letter-spacing: -0.03em; margin-bottom: 4px;">
            ${isRegister ? "New signup" : "Login attempt"}
          </div>
          <div style="font-size: 11px; color: #3f3f46; margin-bottom: 24px; font-family: 'Courier New', monospace;">
            ${timestamp} CT
          </div>

          <div style="background: #18181b; border: 0.5px solid #27272a; border-radius: 8px; overflow: hidden;">
            ${isRegister ? `
            <div style="display: flex; padding: 12px 16px; border-bottom: 0.5px solid #27272a;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: #3f3f46; width: 100px; flex-shrink: 0; padding-top: 1px;">Name</span>
              <span style="font-size: 13px; color: #fafafa;">${name}</span>
            </div>` : ""}
            <div style="display: flex; padding: 12px 16px; border-bottom: 0.5px solid #27272a;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: #3f3f46; width: 100px; flex-shrink: 0; padding-top: 1px;">Email</span>
              <span style="font-size: 13px; color: #dc2626;">${email}</span>
            </div>
            ${isRegister && subject ? `
            <div style="display: flex; padding: 12px 16px; border-bottom: 0.5px solid #27272a;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: #3f3f46; width: 100px; flex-shrink: 0; padding-top: 1px;">Subject</span>
              <span style="font-size: 13px; color: #fafafa;">${subject || "—"}</span>
            </div>` : ""}
            <div style="display: flex; padding: 12px 16px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; color: #3f3f46; width: 100px; flex-shrink: 0; padding-top: 1px;">Type</span>
              <span style="font-size: 13px; color: #fafafa;">${isRegister ? "Registration" : "Sign-in attempt"}</span>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[tutor-signup] email error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}