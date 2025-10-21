import expressPkg from "express";
const { Router } = expressPkg;

import userController from "../controllers/userController.js";

const router = Router();

/**
 * @route   GET /
 * @desc    Get all users
 * @access  Public
 */
router.get("/", userController.getAllUsers);

/**
 * @route   POST /
 * @desc    Create a new user
 * @access  Public
 */
router.post("/", userController.createUser);

/**
 * @route   GET /:id
 * @desc    Get a user by ID
 * @access  Public
 */
router.get("/:id", userController.getUser);

export default router;
