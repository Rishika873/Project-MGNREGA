import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import mgnregaRoutes from "./routes/mgnregaRoutes.js";
import geoRoutes from "./routes/geoRoutes.js"

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // your React app URL
  methods: ["GET", "POST"],
  credentials: true,
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mgnrega", mgnregaRoutes);
app.use("/api/geo", geoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
