import expressPkg from "express";
const express = expressPkg; // use express as function
import "./events/userEvents.js";

// OR simpler if Express supports default export in ESM
// import express from 'express';

import apiRouter from "./routes/indexRoutes.js";
import Sentry from "./config/sentry.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();

// Request handler (must be first middleware)
if (Sentry && Sentry.Handlers) {
  // Request handler must be first
  app.use(Sentry.Handlers.requestHandler());
}

app.use(express.json()); // body parser
app.use("/api", apiRouter);
// Error handler
if (Sentry && Sentry.Handlers) {
  app.use(Sentry.Handlers.errorHandler());
}
app.use(errorHandlerMiddleware);

export default app;
