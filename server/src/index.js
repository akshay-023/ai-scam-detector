import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import historyRoutes from "./routes/history.routes.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-scam-detector-tau.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("ScamGuard AI API is running...");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/history", historyRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});