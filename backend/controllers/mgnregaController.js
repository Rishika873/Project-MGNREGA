import axios from "axios";
import DistrictPerformance from "../models/DistrictPerformance.js";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722";
const API_KEY = process.env.DATA_API_KEY;

export const getDistrictPerformance = async (req, res) => {
  const { state, district } = req.body;

  if (!state || !district) {
    return res.status(400).json({ message: "State and district are required" });
  }

  try {
    console.log("📩 Incoming request body:", { state, district });

    const cached = await DistrictPerformance.findOne({
      state,
      district,
      fetchedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (cached) {
      console.log("✅ Using cached data");
      return res.json(cached.data);
    }

    const stateUpper = state.toUpperCase();
    const districtUpper = district.toUpperCase();

    const url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=50&filters[state_name]=${encodeURIComponent(
      stateUpper
    )}&filters[district_name]=${encodeURIComponent(districtUpper)}`;

    console.log("🌐 Fetching:", url);

    const { data } = await axios.get(url);

    if (!data.records || data.records.length === 0) {
      return res.status(404).json({ message: "No data found for given state/district" });
    }

    const newRecord = new DistrictPerformance({
      state,
      district,
      data,
      fetchedAt: new Date(),
    });
    await newRecord.save();

    console.log("✅ Data saved successfully");
    res.json(data);
  } catch (error) {
    console.error("❌ Error fetching or saving data:", error.message);
    if (error.response) {
      console.error("🔴 API Response:", error.response.status, error.response.data);
    }
    res.status(500).json({ message: "Failed to fetch performance data" });
  }
};
