// Import the Sequelize ORM to manage database connections and models
import { Sequelize } from "sequelize";

// Automatically loads environment variables from the .env file
import "dotenv/config";

class Database {
  constructor() {
    // Initialize a new Sequelize instance with environment configuration
    this.sequelize = new Sequelize(
      process.env.POSTGRES_DB_NAME,
      process.env.POSTGRES_USERNAME,
      process.env.POSTGRES_PASSWORD,
      {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect: process.env.POSTGRES_DIALECT,
        logging: false,
      }
    );
  }

  /**
   * @desc    Authenticate and establish the database connection
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      // Test the database connection
      await this.sequelize.authenticate();
      console.log("✅ Database connected successfully.");
    } catch (err) {
      // Catch any connection or authentication errors
      console.error("❌ Database connection failed:", err);
    }
  }

  getInstance() {
    return this.sequelize;
  }
}

// Export a singleton instance of the Database class
export default new Database();
