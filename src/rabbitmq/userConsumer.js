import RabbitMQService from "../config/rabbitmq.js";
import { sendAllEmail } from "../helper/email_send.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const startUserConsumer = async () => {
  await RabbitMQService.consume(
    "user_exchange",
    "user_queue",
    "user.created",
    async (msg) => {
      console.log("Processing user message:", msg);
      let absoluteTemplatePath;
      let absoluteMailContent;
      if (msg.country && msg.country.toUpperCase() == "INDIA") {
        // Resolve absolute path for the main email template (header/footer/layout)
        absoluteTemplatePath = path.resolve(
          __dirname,
          "../views/templates/main_email_template.html"
        );

        // Resolve absolute path for the email content template (signup-specific content)
        absoluteMailContent = path.resolve(
          __dirname,
          "../views/templates/customer_reg_email_content.html"
        );
      } else if (msg.country && msg.country.toUpperCase() == "USA") {
        // Resolve absolute path for the main email template (header/footer/layout)
        absoluteTemplatePath = path.resolve(
          __dirname,
          "../views/templates/main_email_template.html"
        );

        // Resolve absolute path for the email content template (signup-specific content)
        absoluteMailContent = path.resolve(
          __dirname,
          "../views/templates/customer_reg_email_content.html"
        );
      }

      const emailData = {
        to: msg.email,
        subject:
          "Welcome to IO Platform — Your Account Has Been Successfully Created!!",
        mainTemplatePath: absoluteTemplatePath,
        contentTemplatePath: absoluteMailContent,
        variables: {
          name: msg.name,
          login_url: "https://io-platform.com/login",
        },
      };

      // Send the email
      await sendAllEmail(emailData);
    }
  );
};
