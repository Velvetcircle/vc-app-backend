import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fetch from "node-fetch"; // required to verify recaptcha

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------
// Booking Email Route
// ------------------------------
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
      to: process.env.EMAIL_USER, // sending to yourself
      subject: "New Velvet Circle Booking",
      text: `Name: ${name}
Email: ${email}
Hours: ${hours}
Companion Type: ${companionType}`,
    });

    res.status(200).json({ message: "Booking request sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send booking email." });
  }
});

// ------------------------------
// reCAPTCHA Verification Route
// ------------------------------
app.post("/api/verify-recaptcha", async (req, res) => {
  const { token } = req.body;

  try {
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      {
        method: "POST",
      }
    );
    const data = await verifyRes.json();

    if (data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        errors: data["error-codes"],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Recaptcha verification failed.",
    });
  }
});

// ------------------------------
// Health Check Route
// ------------------------------
app.get("/", (req, res) => {
  res.send("Velvet Circle backend running ✅");
});

// ------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
