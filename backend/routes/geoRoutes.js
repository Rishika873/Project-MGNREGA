// geoRoutes.js
import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        format: "json",
        lat,
        lon,
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("Geo API Error:", err.message);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

export default router;
