import eventEmitter from "./eventEmitter.js";
import RabbitMQService from "../config/rabbitmq.js";

eventEmitter.on("user.created", async (userData) => {
  try {
    await RabbitMQService.publish(
      "user_exchange",
      "user_queue",
      "user.created",
      {
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        country: userData.country || "INDIA",
        timestamp: new Date(),
      }
    );
    console.log("✅ Published user.created message to RabbitMQ");
  } catch (error) {
    console.error("❌ Failed to publish user.created event:", error);
  }
});
