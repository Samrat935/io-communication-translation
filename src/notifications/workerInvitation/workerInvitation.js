import path from "path";
import { renderMessage } from "#services/intl.service.js";
import { renderEmailTemplate } from "#services/email.renderer.js";

const NOTIFICATION_NAME = "workerInvitation";

export const renderWorkerInvitationEmail = async ({
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
      "notifications.workerInvitation.email.subject",
      translationVars
    ),
    content: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.workerInvitation.email.content",
      translationVars
    ),
    button: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.workerInvitation.email.button",
      translationVars
    ),
    cta: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.workerInvitation.email.cta",
      translationVars
    ),
    footerNote: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.workerInvitation.email.footerNote",
      translationVars
    ),
    footerContact: renderMessage(
      NOTIFICATION_NAME,
      locale,
      "notifications.workerInvitation.email.footerContact",
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
