import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mgnregaRoutes from "./routes/mgnregaRoutes.js";
import geoRoutes from "./routes/geoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Fix CORS (handles preflight correctly)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// ✅ Explicitly handle OPTIONS requests
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/mgnrega", mgnregaRoutes);
app.use("/api/geo", geoRoutes);

app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
