import fs from "fs-extra";
import path from "path";
import YAML from "yaml";
import { IntlMessageFormat } from "intl-messageformat";

export const loadMessages = (notification, locale) => {
  // Handle common translations differently
  const basePath =
    notification === "common"
      ? path.resolve("src/templates/common")
      : path.resolve(`src/notifications/${notification}/email`);

  // const baseFile = notification === 'common'
  //   ? `${basePath}/intl.yaml`
  //   : `${basePath}/intl.yaml`;
  // const baseFile = path.join(basePath, "intl.yaml");

  // ...existing code...
  //const localeFile = path.join(basePath, "translations", `${locale}.yaml`);

  const baseFile = path.join(basePath, "intl.yaml");

  const base = YAML.parse(fs.readFileSync(baseFile, "utf8"));

  const localeFile = path.join(basePath, "translations", `${locale}.yaml`);

  if (fs.existsSync(localeFile)) {
    const translation = YAML.parse(fs.readFileSync(localeFile, "utf8"));
    return { ...base, ...translation };
  }
  return base;
};

export const renderMessage = (notification, locale, keyPath, vars = {}) => {
  const messages = loadMessages(notification, locale);
  const msg = keyPath.split(".").reduce((o, k) => o?.[k], messages) || "";
  const replaced = msg.replace(
    /\{#if (.*?)\}([\s\S]*?)\{#else\}([\s\S]*?)\{#\/if\}/g,
    (_, v, ifT, elseT) => (vars[v.trim()] ? ifT : elseT)
  );

  // Convert locale from underscore format (en_GB) to BCP 47 format (en-GB)
  const normalizedLocale = locale.replace(/_/g, "-");

  return new IntlMessageFormat(replaced, normalizedLocale).format(vars);
};
