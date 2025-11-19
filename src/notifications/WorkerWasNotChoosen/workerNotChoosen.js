import path from "path";
import { renderMessage } from "#services/intl.service.js";
import { renderEmailTemplate } from "#services/email.renderer.js";

const NOTIFICATION_NAME = "WorkerWasNotChoosen";

export const renderWorkerWasNotChoosenEmail = async ({
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
      "notifications.WorkerWasNotChoosen.email.subject",
      translationVars
    ),
    content: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.WorkerWasNotChoosen.email.content",
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
