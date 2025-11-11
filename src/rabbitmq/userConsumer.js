import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderWorkerInvitationEmail } from "#notifications/workerInvitation/workerInvitation.js";
import { handleResponse } from "../utils/responseHandler.js";

export const startUserConsumer = async () => {
  await RabbitMQService.consume(
    "user_exchange",
    "user_queue",
    "user.created",
    async (msg, res) => {
      console.log("📬 Received message:", msg);
      try {
        // await sendEmail(req.body);
        const { subject, html } = await renderWorkerInvitationEmail({
          locale: "de_DE",
          businessUnit: msg.businessUnit || "homeworks",
          fullName: msg.name,
          workerFirstName: msg.name,
          inviteLink: "https://www.google.com",
        });

        await sendEmail({
          to: msg.email,
          subject,
          html,
        });

        console.log("✅ Email sent successfully");
      } catch (err) {
        console.error("❌ Failed to send email:", err);
      }
    }
  );
};
