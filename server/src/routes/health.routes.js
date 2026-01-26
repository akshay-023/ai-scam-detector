import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Scam Detector API",
    author: "Akshay",
    timestamp: new Date().toISOString()
  });
});

export default router;
