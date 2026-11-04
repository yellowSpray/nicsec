import nodemailer from "nodemailer";
import { z } from "zod";

const SUBJECTS = {
  surveillance: "Surveillance",
  infidelity: "Enquête d'infidélité",
  background: "Vérification des antécédents",
  missing: "Personne disparue",
  fraud: "Enquête de fraude",
};

// Server-side validation: never trust what the browser sends.
const schema = z.object({
  fullname: z.string().trim().min(3).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(9).max(30).regex(/^[+0-9 ()./-]+$/),
  subject: z.enum(Object.keys(SUBJECTS)),
  description: z.string().trim().min(25).max(5000),
  // Anti-spam: hidden field that humans leave empty
  website: z.string().max(500).optional().default(""),
  // Anti-spam: timestamp (ms) when the form was displayed
  startedAt: z.number().int().positive(),
});

const MIN_FILL_TIME_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;

// Best-effort rate limit (per serverless instance only).
// For a real global limit, use a shared store (Upstash / Vercel KV).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip line breaks so header values (subject) can't be tampered with
const oneLine = (value) => String(value).replace(/[\r\n]+/g, " ");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  const parsed = schema.safeParse(body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const { fullname, email, phone, subject, description, website, startedAt } =
    parsed.data;

  // Bots: honeypot filled or form submitted too fast / stale.
  // Answer 200 so they don't learn they were filtered.
  const elapsed = Date.now() - startedAt;
  if (website || elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FORM_AGE_MS) {
    return res.status(200).json({ success: true });
  }

  const { MAIL_USER, MAIL_PASS, MAIL_TO } = process.env;
  if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
    console.error("send-email: missing MAIL_USER / MAIL_PASS / MAIL_TO");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const subjectLabel = SUBJECTS[subject];

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: MAIL_USER, pass: MAIL_PASS },
    });

    await transporter.sendMail({
      // Send from our own account; the visitor goes in Reply-To
      from: `"Formulaire VESTIGE" <${MAIL_USER}>`,
      replyTo: { name: oneLine(fullname), address: email },
      to: MAIL_TO,
      subject: oneLine(`[Site] ${subjectLabel} - ${fullname}`),
      text: [
        "Nouveau message depuis le formulaire",
        "",
        `Nom : ${fullname}`,
        `Email : ${email}`,
        `Téléphone : ${phone}`,
        `Sujet : ${subjectLabel}`,
        "",
        "Message :",
        description,
      ].join("\n"),
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">
          <h3 style="color:#007bff;">Nouveau message depuis le formulaire</h3>
          <p><strong>Nom :</strong> ${escapeHtml(fullname)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
          <p><strong>Sujet :</strong> ${escapeHtml(subjectLabel)}</p>
          <br />
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-line">${escapeHtml(description)}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("send-email:", error);
    return res.status(500).json({ error: "Error sending email" });
  }
}
