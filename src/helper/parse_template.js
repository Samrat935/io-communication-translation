/**
 * Parses a template string and replaces placeholders like {{name}}, {{link}} with actual values.
 */
export const parseTemplate = (template, variables) => {
  let result = template;

  // Replace each placeholder with the corresponding variable value
  for (const key in variables) {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    result = result.replace(pattern, variables[key]);
  }
  return result;
};
