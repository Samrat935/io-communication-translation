const dotenv = require("dotenv");
const path = require("path");

// Load the .env file from the root of the project
const envFile = path.resolve(__dirname, `../../.env`);
console.log(`Loading environment variables from: ${envFile}`);

dotenv.config({ path: envFile });

console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD);
console.log("Type of POSTGRES_PASSWORD:", typeof process.env.POSTGRES_PASSWORD);
module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_HOST,
    port: 15432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: console.log,
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
};
