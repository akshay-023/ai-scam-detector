import express from "express";
import auth from "../middleware/auth.middleware.js";
import { analyzeText } from "../services/ai.selector.js";
import Scan from "../models/Scan.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    const result = await analyzeText(text);

    await Scan.create({
      user: req.user.id,
      inputText: text,
      verdict: result.verdict,
      riskScore: result.riskScore,
      reasons: result.reasons,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analysis failed" });
  }
});

export default router;
