import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderWorkerInvitationEmail } from "#notifications/workerInvitation/workerInvitation.js";

export const startInvitationConsumer = async () => {
  await RabbitMQService.consume(
    "worker_invites",
    "send_invitations",
    "invitation.send",
    async (msgs) => {
      console.log("Processing user message:", msgs);
      for (const msg of msgs) {
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
      }
    }
  );
};
