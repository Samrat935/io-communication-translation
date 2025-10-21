import fs from "fs";
import path from "path";
import { parseTemplate } from "./parse_template.js";

/**
 * Renders an HTML template from a file by replacing placeholders with variables.
 */
export const renderTemplate = (templatePath, variables) => {
  const absolutePath = path.resolve(templatePath);

  // Read the file content as a UTF-8 string
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  return parseTemplate(fileContent, variables);
};
