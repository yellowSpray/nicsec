import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()

router.post("/send-email", async (req,res) => {
    const { fullname , email , phone , subject , description } = req.body

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        const mailOptions = {
            from: email,
            to: "email@exemple.com",
            subject: `Nouveau message: ${subject}`,
            html: `
                <h2>Nouveau message depuis le formulaire de nicsec</h2>
                <p><strong>Nom :</strong> ${fullname}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${phone}</p>
                <p><strong>Message :</strong></p>
                <p style="white-sapce: pre-line">${description}</p>
            `     
        }

        await transporter.sendMail(mailOptions)
        res.status(200).json({ success: true })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error sending email" })
    }
})

export default router;