import ErrorLog from "../models/errorLog.js";

export const logError = async (error, context = {}, level = "error") => {
  try {
    await ErrorLog.create({
      level,
      message: error.message || String(error),
      stack: error.stack || null,
      context,
    });
    console.log("✅ Error logged to database");
  } catch (err) {
    console.error("❌ Failed to log error to database:", err);
  }
};
