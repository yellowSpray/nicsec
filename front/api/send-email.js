import nodemailer from "nodemailer";
import { z } from "zod";

// "Vous nous contactez comme" (content document, section 9.2)
const CLIENT_TYPES = {
  individual: "Particulier",
  company: "Entreprise",
  insurer: "Assurance",
  professional: "Professionnel",
  other: "Autre",
};

// Server-side validation: never trust what the browser sends.
const schema = z.object({
  fullname: z.string().trim().min(3).max(100),
  company: z.string().trim().max(150).optional().default(""),
  role: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(9).max(30).regex(/^[+0-9 ()./-]+$/),
  clientType: z.enum(Object.keys(CLIENT_TYPES)),
  subject: z.string().trim().min(3).max(150),
  description: z.string().trim().min(25).max(5000),
  // Consent to the privacy policy is mandatory
  consent: z.literal(true),
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

  const {
    fullname, company, role, email, phone, clientType, subject, description, website, startedAt,
  } = parsed.data;

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

  const clientTypeLabel = CLIENT_TYPES[clientType];
  const optional = (value) => value || "-";

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
      subject: oneLine(`[Site] ${clientTypeLabel} - ${subject}`),
      text: [
        "Nouvelle demande depuis le formulaire",
        "",
        `Nom et prénom : ${fullname}`,
        `Entreprise / organisation : ${optional(company)}`,
        `Fonction : ${optional(role)}`,
        `E-mail : ${email}`,
        `Téléphone : ${phone}`,
        `Contacte comme : ${clientTypeLabel}`,
        `Objet : ${subject}`,
        "Consentement politique de confidentialité : oui",
        "",
        "Description :",
        description,
      ].join("\n"),
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">
          <h3 style="color:#394149;">Nouvelle demande depuis le formulaire</h3>
          <p><strong>Nom et prénom :</strong> ${escapeHtml(fullname)}</p>
          <p><strong>Entreprise / organisation :</strong> ${escapeHtml(optional(company))}</p>
          <p><strong>Fonction :</strong> ${escapeHtml(optional(role))}</p>
          <p><strong>E-mail :</strong> ${escapeHtml(email)}</p>
          <p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>
          <p><strong>Contacte comme :</strong> ${escapeHtml(clientTypeLabel)}</p>
          <p><strong>Objet :</strong> ${escapeHtml(subject)}</p>
          <p><strong>Consentement politique de confidentialité :</strong> oui</p>
          <br />
          <p><strong>Description :</strong></p>
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
