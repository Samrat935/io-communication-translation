/**
 * Utility: handleResponse
 * -----------------------
 * Standardizes API responses for success and error cases.
 *
 * Usage:
 *   import { handleResponse } from '../utils/responseHandler.js';
 *   handleResponse(res, 200, 'User created successfully', userData);
 *
 *   handleResponse(res, 400, 'Invalid input', null, error);
 */

/**
 * Sends a standardized JSON response.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (e.g., 200, 400, 500)
 * @param {string} message - Response message
 * @param {any} [data=null] - Optional response data
 * @param {any} [error=null] - Optional error details
 */
export const handleResponse = (
  res,
  statusCode,
  message,
  data = null,
  error = null
) => {
  const responsePayload = {
    statusCode,
    message,
    ...(data && { data }), // Include data only if provided
    ...(error && { error: formatError(error) }), // Include formatted error if present
  };

  res.status(statusCode).json(responsePayload);
};

/**
 * Formats error objects for consistent API output.
 *
 * @param {any} error - Error instance or message
 * @returns {string|object} - Formatted error response
 */
const formatError = (error) => {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return typeof error === "string" ? error : "An unexpected error occurred";
};
