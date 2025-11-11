// Import the user service which contains all the business logic
// and database interactions related to the User model.
import userService from "../services/userService.js";
import { handleResponse } from "../utils/responseHandler.js";
import { sendEmail, renderPreview } from "#services/email.service.js";
import { renderWorkerInvitationEmail } from "#notifications/workerInvitation/workerInvitation.js";
/**
 * UserController
 * ---------------
 * Handles incoming HTTP requests related to Users and
 * sends responses back to the client.
 *
 * This controller delegates database operations to the UserService.
 */
class UserController {
  /**
   * @desc    Create a new user
   * @route   POST /api/users
   * @access  Public (or can be Private if auth added)
   */
  async createUser(req, res) {
    try {
      // Pass the request body data to the service layer to create a new user.
      const user = await userService.createUser(req.body);
      if (user.error) {
        //return handleResponse(res, 400, user.message, user.error);
        return handleResponse(res, 400, user.message, {
          code: user.code,
          error: user.error,
        });
      }
      // Return the created user with HTTP 201 status (Created)
      return handleResponse(res, 201, "User created successfully", user);
    } catch (err) {
      // Handle any unexpected errors and send 500 Internal Server Error response
      return handleResponse(res, 500, "Internal Server Error", null, err);
    }
  }

  /**
   * @desc    Get all users
   * @route   GET /api/users
   * @access  Public
   */
  async getAllUsers(req, res) {
    try {
      // Fetch all users from the database via service layer
      const users = await userService.getAllUsers();

      if (users.error) {
        //return handleResponse(res, 400, user.message, user.error);
        handleResponse(res, 400, users.message, {
          code: users.code,
          error: users.error,
        });
      }
      // Return the created user with HTTP 201 status (Created)
      handleResponse(res, 200, "Users fetch successfully", users);
    } catch (err) {
      // Handle errors and respond with 500 Internal Server Error
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * @desc    Get a single user by ID
   * @route   GET /api/users/:id
   * @access  Public
   */
  async getUser(req, res) {
    try {
      // Extract the user ID from the request parameters
      const userId = req.params.id;

      // Find user by ID through the service layer
      const user = await userService.getUserById(userId);

      // If no user found, return 404 Not Found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return the found user with HTTP 200 status (OK)
      res.status(200).json(user);
    } catch (err) {
      // Handle errors and respond with 500 Internal Server Error
      res.status(500).json({ error: err.message });
    }
  }

  previewEmailHandler = async (req, res) => {
    try {
      const html = await renderPreview({
        locale: "fr_FR",
        businessUnit: "sales",
        name: "John Doe",
        inviter: "Jane Smith",
        inviteLink: "https://www.google.com",
      });
      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send("Preview failed");
    }
  };
}

// Export an instance of the controller for use in route files
export default new UserController();
