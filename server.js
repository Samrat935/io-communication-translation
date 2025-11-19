// Import and load environment variables from a .env file
import "dotenv/config";

// Import the Express app instance from the app.js file
import app from "./src/app.js";

// Import the database configuration and connection logic
import db from "./src/config/database.js";
import RabbitMQService from "./src/config/rabbitmq.js";
import { startUserConsumer } from "./src/rabbitmq/userConsumer.js";
import { startInvitationConsumer } from "./src/rabbitmq/invitationConsumer.js";
import { startWorkerReminderConsumer } from "./src/rabbitmq/workerReminderConsumer.js";
import { startClientReminderConsumer } from "./src/rabbitmq/clientReminderConsumer.js";
import { startWorkerNotificationConsumer } from "./src/rabbitmq/workerNotificationConsumer.js";
import { startClientNotificationConsumer } from "./src/rabbitmq/ClientNotificationConsumer.js";
// Set the server port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Define an async function to start the server
const startServer = async () => {
  try {
    // Connect to the database
    await db.connect();

    // Connect to RabbitMQ
    await RabbitMQService.connect();

    // 2. Start consumer AFTER RabbitMQ channel is ready
    await startUserConsumer();
    await startInvitationConsumer();
    await startWorkerReminderConsumer();
    await startClientReminderConsumer();
    await startWorkerNotificationConsumer();
    await startClientNotificationConsumer();

    // Synchronize all Sequelize models with the database (alter tables as needed)
    await db.getInstance().sync({ alter: true }); // Use { force: true } to drop and recreate tables

    // Start the Express server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    // Log any errors that occur during startup
    console.error("Failed to start server:", err);
  }
};

// Call the function to start the server
startServer();
