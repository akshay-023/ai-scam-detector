import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import scanRoutes from "./routes/scan.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/scans", scanRoutes);
app.use("/health", healthRoutes); // 👈 THIS LINE

export default app;
