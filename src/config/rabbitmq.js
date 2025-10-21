import amqplib from "amqplib";
import "dotenv/config";

/**
 * RabbitMQService - A class-based wrapper for managing RabbitMQ connections,
 */
class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  /**
   * Connects to RabbitMQ using environment variables.
   */
  async connect() {
    try {
      this.connection = await amqplib.connect({
        protocol: "amqp",
        hostname: process.env.RABBITMQ_HOST || "127.0.0.1",
        port: process.env.RABBITMQ_PORT || 5672,
        username: process.env.RABBITMQ_USER || "guest",
        password: process.env.RABBITMQ_PASSWORD || "guest",
        vhost: process.env.RABBITMQ_VHOST || "/",
      });

      this.channel = await this.connection.createChannel();
      console.log("✅ Connected to RabbitMQ");
    } catch (err) {
      console.error("❌ Failed to connect to RabbitMQ:", err);
      throw err;
    }
  }

  /**
   * Declares an exchange, queue, and binds them together.
   */
  async setupQueue(exchange, queue, routingKey) {
    await this.channel.assertExchange(exchange, "topic", { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);
  }

  /**
   * Publishes a message to the given exchange using a routing key.
   */
  async publish(exchange, queue, routingKey, data) {
    if (!this.channel) throw new Error("RabbitMQ channel not initialized");

    await this.setupQueue(exchange, queue, routingKey);
    await this.channel.assertExchange(exchange, "topic", { durable: true });

    const messageBuffer = Buffer.from(JSON.stringify(data));

    this.channel.publish(exchange, routingKey, messageBuffer, {
      contentType: "application/json",
      persistent: true,
    });

    console.log(
      `📤 Message published to exchange "${exchange}" with routing key "${routingKey}"`
    );
  }

  /**
   * Consumes messages from a queue.
   * @param {string} queue - Queue name.
   * @param {function} callback - Function to handle messages.
   */
  async consume(exchange, queue, routingKey, callback) {
    if (!this.channel) throw new Error("RabbitMQ channel not initialized");
    await this.setupQueue(exchange, queue, routingKey);
    await this.channel.consume(
      queue,
      (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          console.log(`📩 Received message from queue "${queue}"`);
          callback(content);
          this.channel.ack(msg);
        }
      },
      { noAck: false }
    );

    console.log(`✅ Listening for messages on queue "${queue}"`);
  }

  /**
   * Closes the RabbitMQ connection and channel.
   */
  async close() {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
      console.log("RabbitMQ connection closed.");
    } catch (err) {
      console.error("Error closing RabbitMQ connection:", err);
    }
  }
}

export default new RabbitMQService();
