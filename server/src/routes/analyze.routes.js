import express from "express";
import auth from "../middleware/auth.middleware.js";
import { analyzeText } from "../services/ai.selector.js";
import Scan from "../models/Scan.js";

const router = express.Router();

/**
 * POST /analyze
 * Protected route – requires JWT
 */
router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        message: "Text is required for analysis",
      });
    }

    // 🔍 Run AI analysis (mock or real based on env)
    const analysisResult = await analyzeText(text);

    // 🧾 Save scan to DB
    const scan = await Scan.create({
      user: req.user.id,
      text,
      verdict: analysisResult.verdict,
      riskScore: analysisResult.riskScore,
      reasons: analysisResult.reasons,
    });

    // ✅ Send response
    res.json({
      verdict: scan.verdict,
      riskScore: scan.riskScore,
      reasons: scan.reasons,
      createdAt: scan.createdAt,
    });
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({
      message: "Failed to analyze text",
    });
  }
});

export default router;
