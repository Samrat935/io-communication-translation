import { emailTransporter } from "./email_transporter.js";
import { logError } from "./errorLogger.js";

/**
 * Send an email using the configured transporter.
 */
export const sendEmail = async (to, subject, html) => {
  try {
    const info = await emailTransporter.sendMail({
      from: `"Io Communication" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    await logError(error, { to, subject });
    console.error("Error sending email:", error);
    return false;
  }
};
