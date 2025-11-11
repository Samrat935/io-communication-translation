import expressPkg from "express";
const { Router } = expressPkg;

import userController from "../controllers/userController.js";
import { renderWorkerInvitationEmail } from "#notifications/workerInvitation/workerInvitation.js";

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

router.get("/email/preview", async (req, res) => {
  try {
    const { subject, html } = await renderWorkerInvitationEmail({
      locale: req.query.locale || "de_DE",
      businessUnit: req.query.businessUnit || "sales",
      fullName: req.query.fullName || "John Doe",
      workerFirstName: req.query.workerFirstName || "John",
      inviteLink: req.query.inviteLink || "https://example.com/invite",
    });
    res.status(200).send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
