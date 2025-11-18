import path from "path";
import { renderMessage } from "#services/intl.service.js";
import { renderEmailTemplate } from "#services/email.renderer.js";

const NOTIFICATION_NAME = "RemindMissingClientDuration";

export const renderClientReminderEmail = async ({
  locale,
  businessUnit,
  ...vars
}) => {
  const translationVars = { businessUnit, ...vars };

  // Only handle notification-specific translations
  const parts = {
    subject: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.RemindMissingClientDuration.email.subject",
      translationVars
    ),
    content: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.RemindMissingClientDuration.email.content",
      translationVars
    ),
    managehours: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.RemindMissingClientDuration.email.managehours",
      translationVars
    ),
  };

  // Use the helper - common translations are auto-injected!
  const html = await renderEmailTemplate(
    path.resolve(`src/notifications/${NOTIFICATION_NAME}/email/template.html`),
    locale,
    businessUnit,
    parts
  );

  return {
    subject: parts.subject,
    html,
  };
};
