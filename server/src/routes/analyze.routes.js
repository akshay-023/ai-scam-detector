import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { analyzeText } from "../services/ai.selector.js";
import Scan from "../models/Scan.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // AI analysis
    const analysis = await analyzeText(text);

    // Save scan to DB
    const scan = await Scan.create({
      user: req.user.id,
      inputText: text,
      verdict: analysis.verdict,
      riskScore: analysis.riskScore,
      reasons: analysis.reasons,
    });

    res.status(201).json({
      success: true,
      scan,
    });
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({ message: "AI analysis failed" });
  }
});

export default router;
