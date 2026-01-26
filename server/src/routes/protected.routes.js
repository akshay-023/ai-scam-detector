import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route   GET /api/protected
 * @desc    Test protected route
 */
router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted 🔐",
    userId: req.user.id,
  });
});

export default router;
