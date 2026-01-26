import express from "express";
import mongoose from "mongoose";
import authMiddleware from "../middleware/auth.middleware.js";
import Scan from "../models/Scan.js";

const router = express.Router();

/**
 * GET /api/scans
 * Fetch scan history for logged-in user (with pagination)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const [scans, total] = await Promise.all([
      Scan.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Scan.countDocuments({ user: req.user.id }),
    ]);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalScans: total,
      scans,
    });
  } catch (error) {
    console.error("Fetch scans error:", error);
    res.status(500).json({ message: "Failed to fetch scans" });
  }
});

/**
 * GET /api/scans/:id
 * Fetch a single scan by ID (user-owned only)
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid scan ID" });
    }

    const scan = await Scan.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    res.status(200).json({
      success: true,
      scan,
    });
  } catch (error) {
    console.error("Fetch scan error:", error);
    res.status(500).json({ message: "Failed to fetch scan" });
  }
});

export default router;
