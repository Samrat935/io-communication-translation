import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderWorkerReminderEmail } from "#notifications/RemindMissingWorkerDuration/workerReminder.js";

export const startWorkerReminderConsumer = async () => {
  await RabbitMQService.consume(
    "worker_reminder",
    "worker_reminder_mail",
    "worker.reminder",
    async (msgs) => {
      console.log("Processing message:", msgs);
      for (const msg of msgs) {
        const { subject, html } = await renderWorkerReminderEmail({
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
