import RabbitMQService from "../config/rabbitmq.js";
import { sendEmail } from "#services/email.service.js";
import { renderWorkerWasNotChoosenEmail } from "#notifications/WorkerWasNotChoosen/workerNotChoosen.js";

export const startClientNotificationConsumer = async () => {
  await RabbitMQService.consume(
    "client_notification",
    "client_notification_mail",
    "client.notification",
    async (msgs) => {
      //console.log("Processing message:", msgs);
      if (Array.isArray(msgs.data)) {
        for (const userObject of msgs.data) {
          const { subject, html } = await renderWorkerWasNotChoosenEmail({
            locale: userObject.locale,
            businessUnit: userObject.businessUnit || "companyworks",
            fullName: userObject.name,
            street: userObject.street,
            city: userObject.city,
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
