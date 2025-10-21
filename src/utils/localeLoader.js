import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getLocaleFile(country) {
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

  const fileContents = fs.readFileSync(localePath, "utf8");
  return yaml.load(fileContents);
}
