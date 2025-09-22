const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_APP_GMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });
  
  const mailOptions = {
    from: `"Pet Care App 🐾" <${process.env.GOOGLE_APP_GMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
