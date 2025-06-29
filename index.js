import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// send booking email
app.post("/api/bookings", async (req, res) => {
  const { name, email, hours, companionType } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself
      subject: "New Velvet Circle Booking",
      text: `Name: ${name}
Email: ${email}
Hours: ${hours}
Companion Type: ${companionType}`,
    });

    res.status(200).json({ message: "Booking request sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

app.get("/", (req, res) => {
  res.send("Velvet Circle backend running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
