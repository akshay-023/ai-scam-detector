import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "AI Scam Detector API",
    author: "Akshay",
    uptime: process.uptime()
  });
});

export default router;
