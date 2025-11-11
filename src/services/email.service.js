import nodemailer from "nodemailer";

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

export const sendEmail = async ({ to, subject, html, from }) => {
  await getTransporter().sendMail({
    from: from || process.env.SMTP_FROM_EMAIL || "no-reply@example.com",
    to,
    subject,
    html,
  });
};

export const renderPreview = async ({
  notification = "workerInvitation",
  locale = vars.locale || process.env.DEFAULT_LOCALE || "en_GB",
  businessUnit = vars.businessUnit || "sales",
  ...vars
}) => {
  const { subject, html } = await renderWorkerInvitationEmail({
    locale,
    businessUnit,
    ...vars,
  });
  return html;
};
