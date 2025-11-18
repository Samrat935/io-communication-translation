import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderClientReminderEmail } from "#notifications/RemindMissingClientDuration/clientReminder.js";

export const startClientReminderConsumer = async () => {
  await RabbitMQService.consume(
    "client_reminder",
    "client_reminder_mail",
    "client.reminder",
    async (msgs) => {
      console.log("Processing message:", msgs);
      for (const msg of msgs) {
        const { subject, html } = await renderClientReminderEmail({
          locale: "en_GB",
          businessUnit: msg.businessUnit || "companyworks",
          fullName: msg.name,
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
