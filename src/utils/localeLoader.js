import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//.yml file string veriable (Hello ${{name}})replace function
function replaceVariables(str, variables = {}) {
  if (typeof str !== "string") return str;
  return str.replace(/\$\{\{(.*?)\}\}/g, (_, key) => {
    const trimmedKey = key.trim();
    return variables[trimmedKey] ?? "";
  });
}

function deepReplace(obj, variables) {
  if (typeof obj === "string") {
    return replaceVariables(obj, variables);
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deepReplace(item, variables));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = deepReplace(value, variables);
    }
    return newObj;
  }
  return obj;
}

export function getLocaleFile(country, variables = {}) {
  let localePath;
  // Map country to locale code
  const countryToLocale = {
    INDIA: "en", // or 'hi' if you have Hindi translation
    USA: "en",
    GERMANY: "de",
    FRANCE: "fr",
  };
  const localeCode = countryToLocale[country?.toUpperCase()] || "en"; // fallback
  if (localeCode === "en") {
    localePath = path.resolve(__dirname, `../languages/intl.yml`);
  } else {
    localePath = path.resolve(
      __dirname,
      `../languages/translations/${localeCode}/intl.yml`
    );
  }

  if (!fs.existsSync(localePath)) {
    throw new Error(`Locale file not found for: ${localeCode}`);
  }

  const content = fs.readFileSync(localePath, "utf8");
  const parsed = yaml.load(content);

  // Replace placeholders recursively
  return deepReplace(parsed, variables);
}
