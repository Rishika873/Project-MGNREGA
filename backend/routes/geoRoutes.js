// geoRoutes.js
import express from "express";
import axios from "axios";
const router = express.Router();

router.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon,
        },
        headers: {
          // ✅ REQUIRED BY NOMINATIM (otherwise they BLOCK requests)
          "User-Agent": "MGNREGA-Tracker/1.0 (rishika@example.com)",
          "Accept-Language": "en",
        },
        timeout: 8000, // ✅ prevent hanging requests
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Geo API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

export default router;
