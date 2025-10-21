import { renderTemplate } from "./template_render.js";
import { sendEmail } from "../utils/email_sender.js";
import path from "path";

// Function to send all email
export const sendAllEmail = async (emailData) => {
  // Resolve template paths — fallback to defaults if not provided
  const mainTemplatePath =
    emailData.mainTemplatePath ||
    path.join(__dirname, "../views/templates/main_email_template.html");
  const contentTemplatePath =
    emailData.contentTemplatePath ||
    path.join(__dirname, "../views/templates/customer_reg_email_content.html");

  // Render the content template with provided variables
  emailData.variables.mail_content = renderTemplate(
    contentTemplatePath,
    emailData.variables
  );
  // Render the main template, embedding the content
  const finalHtml = renderTemplate(mainTemplatePath, emailData.variables);

  // Send the email
  const emailSent = await sendEmail(emailData.to, emailData.subject, finalHtml);
  if (emailSent) {
    console.log(`Email successfully sent to ${emailData.to}`);
  } else {
    console.error(`Failed to send email to ${emailData.to}`);
  }
};
