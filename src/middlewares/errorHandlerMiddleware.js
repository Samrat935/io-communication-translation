import { logError } from "../utils/errorLogger.js";

export const errorHandlerMiddleware = async (err, req, res, next) => {
  try {
    // Prevent duplicate responses
    if (res.headersSent) {
      console.warn("⚠️ Headers already sent, skipping error response.");
      return next(err);
    }

    // Log error in DB
    await logError(err, { path: req.originalUrl, method: req.method });

    // Send response
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Internal Server Error",
    });
  } catch (loggingError) {
    console.error(
      "❌ Failed to log error in errorHandlerMiddleware:",
      loggingError
    );
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
