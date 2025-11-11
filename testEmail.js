import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // must be false for 587 (TLS)
  auth: {
    user: "9968fa001@smtp-brevo.com",
    pass: "tG6MVL8R1YQAfps4",
  },
});

const testEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: "samrat@zycosoft.com",
      to: "samratsamanta250@gmail.com", // 👈 replace with your real email
      subject: "✅ SMTP Test Email from Node.js",
      text: "If you’re reading this, SMTP via Brevo works!",
      html: "<p>If you’re reading this, <b>SMTP via Brevo works!</b> 🎉</p>",
    });

    console.log("✅ Test email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send test email:", error);
  }
};

testEmail();
