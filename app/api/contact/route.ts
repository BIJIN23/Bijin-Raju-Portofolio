import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // email YOU receive
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,                          // so you can reply directly to sender
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;padding:2rem;border:1px solid #e5e7eb;border-radius:10px">
          <h2 style="margin-top:0;color:#111">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#6b7280;width:90px"><strong>Name</strong></td>
              <td style="padding:8px 0;color:#111">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280"><strong>Email</strong></td>
              <td style="padding:8px 0;color:#111"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7280;vertical-align:top"><strong>Message</strong></td>
              <td style="padding:8px 0;color:#111;line-height:1.7">${message}</td>
            </tr>
          </table>
          <p style="margin-top:1.5rem;font-size:0.8rem;color:#9ca3af">
            Sent from your portfolio contact form · Hit reply to respond directly.
          </p>
        </div>
      `,
    });

    // auto-reply to the sender
    await transporter.sendMail({
      from: `"Bijin Raju" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}!`,
      html: `
       <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 560px; margin: auto; padding: 0; background-color: #f9fafb;">
            <!-- Card Container -->
            <div style="background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb;">
                <h2 style="margin: 0 0 16px; color: #111827; font-size: 22px;">
                     Hey ${name}, 👋
                </h2>
                
                <p style="margin: 0 0 20px; color: #374151; font-size: 15px; line-height: 1.7;">
                Thanks for reaching out! I've received your message and will get back to you within 
                <strong style="color:#111827;">24 hours</strong>.
                </p>
                <div style="height: 1px; background: #e5e7eb; margin: 20px 0;"></div>
                <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px;">
                Meanwhile, feel free to explore:
                </p>
                <div style="margin-bottom: 20px;">
                <a href="https://github.com/BIJIN23" 
                    style="display:inline-block; margin-right:10px; padding:10px 16px; background:#1f6feb; color:#ffffff; text-decoration:none; border-radius:6px; font-size:14px;">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/bijin-raju-5b6a15210/" 
                    style="display:inline-block; padding:10px 16px; background:#0a66c2; color:#ffffff; text-decoration:none; border-radius:6px; font-size:14px;">
                    LinkedIn
                </a>
                </div>
                <p style="margin: 24px 0 0; color: #111827; font-size: 15px;">
                — <strong>Bijin Raju</strong>
                </p>
            </div>
            <p style="text-align:center; margin-top: 16px; font-size: 12px; color: #9ca3af;">
                This is an automated response. Please do not reply directly to this email.
            </p>

            </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}