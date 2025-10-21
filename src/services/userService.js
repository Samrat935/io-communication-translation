// Import the User model to interact with the "users" table in the database
import User from "../models/user.js";
import UserRepository from "../repository/userRepository.js";
import eventEmitter from "../events/eventEmitter.js";
import Sentry from "../config/sentry.js";
import { logError } from "../utils/errorLogger.js";

/**
 * UserService
 * ------------
 * This service layer handles all business logic related to User data.
 * It acts as an intermediary between the controller and the database model.

 */
class UserService {
  async createUser(data) {
    try {
      const newUser = await UserRepository.createUser(data);
      if (newUser && !newUser.error) {
        // Emit event will publishing to RabbitMQ only if user creation was successful
        eventEmitter.emit("user.created", newUser);
      }

      return newUser;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  /**
   * Retrieve all users from the database
   */
  async getAllUsers() {
    try {
      const allUsers = await UserRepository.getAllUsers();
      if (allUsers.error) {
        return allUsers; // Return error object if retrieval failed
      }
      return allUsers;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  /**
   * Retrieve a single user by primary key (ID)
   */
  async getUserById(id) {
    return await User.findByPk(id);
  }
}

// Export a singleton instance of UserService
export default new UserService();
