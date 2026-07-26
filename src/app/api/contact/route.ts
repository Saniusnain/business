import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/site";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const ROLE_LABELS: Record<string, string> = {
  healthcare: "Healthcare professional / researcher",
  investor: "Investor / incubator",
  individual: "Individual / family",
  press: "Press / media",
  collaborator: "Potential collaborator",
  curious: "Just curious",
};

const MAX_LENGTHS = { name: 200, email: 320, message: 5000 };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, role, message } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !EMAIL_RE.test(email.trim()) ||
    !(role in ROLE_LABELS) ||
    !message.trim() ||
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    // Email delivery isn't configured on this deployment; the client falls
    // back to opening a prefilled WhatsApp chat.
    return Response.json({ error: "email_not_configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"CraveLab Website" <${user}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),
      subject: `New contact form message from ${name.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Role: ${ROLE_LABELS[role]}`,
        "",
        message.trim(),
      ].join("\n"),
    });
  } catch (err) {
    console.error("Contact form email failed:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
