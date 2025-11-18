import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderWorkerReminderEmail } from "#notifications/RemindMissingWorkerDuration/workerReminder.js";

export const startWorkerNotificationConsumer = async () => {
  await RabbitMQService.consume(
    "worker_notification",
    "worker_notification_mail",
    "worker.notification",
    async (msgs) => {
      console.log("Processing message:", msgs);
      if (Array.isArray(msgs.data)) {
        for (const userObject of msgs.data) {
          const { subject, html } = await renderWorkerReminderEmail({
            locale: userObject.locale,
            businessUnit: userObject.businessUnit || "companyworks",
            fullName: userObject.name,
          });

          await sendEmail({
            to: userObject.email,
            subject,
            html,
          });
          console.log("✅ Email sent successfully");
        }
      }
    }
  );
};
