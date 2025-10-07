import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullname, email, phone, subject, description } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_TO,
      subject: `nisec.be`,
      html: `
                  <div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">
                      <h3 style="color:#007bff;">Nouveau message depuis le formulaire !</h3>
                      <p><strong>Nom :</strong> ${fullname}</p>
                      <p><strong>Email :</strong> ${email}</p>
                      <p><strong>Téléphone :</strong> ${phone}</p>
                      <p><strong>Sujet :</strong> ${subject}</p>
                      <br />
                      <p><strong>Message :</strong></p>
                      <p style="white-sapce: pre-line">${description}</p>
                  </div>
              `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
}
