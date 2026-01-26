import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy 🚀",
    time: new Date().toISOString(),
  });
});

export default router;
