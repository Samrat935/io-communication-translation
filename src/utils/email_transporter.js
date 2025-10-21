import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the correct .env file path based on the environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFile = path.resolve(__dirname, `../../.env`);

// Load environment variables from the .env file
const result = dotenv.config({ path: envFile });

if (result.error) {
  console.error(`Failed to load .env file: ${envFile}`);
  console.error(result.error);
  process.exit(1);
}

// Create a reusable transporter object using SMTP transport
export const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "false",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify the connection configuration
emailTransporter.verify((error, success) => {
  if (error) {
    console.error("Email transporter configuration error:", error);
  } else {
    console.log("Email transporter is ready to send messages");
  }
});
