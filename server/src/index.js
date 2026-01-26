import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import scanRoutes from "./routes/scan.routes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());

/* =======================
   DATABASE
======================= */
connectDB();

/* =======================
   ROUTES
======================= */
app.get("/", (req, res) => {
  res.send("🚀 AI Scam Detector API is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Auth
app.use("/api/auth", authRoutes);

// AI Analyze (protected)
app.use("/api/analyze", analyzeRoutes);

// Scan history (protected)
app.use("/api/scans", scanRoutes);

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
