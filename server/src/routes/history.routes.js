import express from "express";
import auth from "../middleware/auth.middleware.js";
import Scan from "../models/Scan.js";

const router = express.Router();

/**
 * GET /api/history
 * Returns scan history for logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json(scans);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default router;