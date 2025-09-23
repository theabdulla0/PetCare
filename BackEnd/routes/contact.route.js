const express = require("express");
const sendEmail = require("../utils/sendMail");
const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendEmail({
      to: process.env.GOOGLE_APP_GMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `
        <h2>📩 New Contact Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email Error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

module.exports = router;
