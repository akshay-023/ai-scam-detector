import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import scanRoutes from "./routes/scan.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/analyze", analyzeRoutes);


export default app;
