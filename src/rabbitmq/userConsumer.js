import RabbitMQService from "../config/rabbitmq.js";
import { sendAllEmail } from "../helper/email_send.js";
import { getLocaleFile } from "../utils/localeLoader.js";
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

      // Load correct locale translations
      const translations = getLocaleFile("GERMANY", { name: msg.name });
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

      const content = translations.customer_reg_email_content;
      const emailData = {
        to: msg.email,
        subject:
          "Welcome to IO Platform — Your Account Has Been Successfully Created!!",
        mainTemplatePath: absoluteTemplatePath,
        contentTemplatePath: absoluteMailContent,
        variables: {
          login_url: "https://io-platform.com/login",
          welcome: content.header.welcome,
          hello: content.body.hello,
          first_text: content.body.first_text,
          second_text: content.body.second_text,
          third_text: content.body.third_text,
          fourth_text: content.body.fourth_text,
          fifth_text: content.body.fifth_text,
          sixth_text: content.body.sixth_text,
          footer_text_one: content.footer.footer_text_one,
          footer_text_two: content.footer.footer_text_two,
        },
      };

      // Send the email
      await sendAllEmail(emailData);
    }
  );
};
