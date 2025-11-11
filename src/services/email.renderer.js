import ejs from 'ejs';
import path from 'path';
import { renderMessage } from './intl.service.js';

const COMMON_TRANSLATIONS = 'common';

/**
 * Renders an email template with automatic injection of common translations
 */
export const renderEmailTemplate = async (templatePath, locale, businessUnit, templateVars = {}) => {
  // Load common translations for header/footer
  const commonVars = {
    logoUrl: getLogoUrl(businessUnit),
    logoAltText: renderMessage(COMMON_TRANSLATIONS, locale, 'header.altText', { businessUnit }),
    copyrightText: renderMessage(COMMON_TRANSLATIONS, locale, 'footer.copyright', { 
      year: new Date().getFullYear(), 
      businessUnit 
    }),
    businessUnit
  };

  // Merge common vars with template-specific vars
  const html = await ejs.renderFile(templatePath, {
    ...commonVars,
    ...templateVars, // Template-specific vars override common if needed
  });

  return html;
};

const getLogoUrl = (businessUnit) => {
  const logos = { sales: '...', support: '...', marketing: '...' };
  return logos[businessUnit] || logos.sales;
};