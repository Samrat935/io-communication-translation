import expressPkg from "express";
/**
 * Destructures the Router class from the expressPkg module.
 * @const
 * @type {function}
 * @description Used to create modular, mountable route handlers in Express applications.
 */
const { Router } = expressPkg;

import userRoutes from "./userRoutes.js";

const apiRouter = Router();

/**
 * @route   /user
 * @desc    user related routes
 */

apiRouter.use("/users", userRoutes);

export default apiRouter;
