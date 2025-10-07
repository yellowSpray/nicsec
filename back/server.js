import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"]
}))

app.post("/send-email", async (req,res) => {
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
            `     
        }

        await transporter.sendMail(mailOptions)
        res.status(200).json({ success: true })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error sending email" })
    }
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));