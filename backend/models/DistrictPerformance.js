import mongoose from "mongoose";

const districtPerformanceSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  data: { type: Object, required: true },
  fetchedAt: { type: Date, default: Date.now },
});


export default mongoose.model("DistrictPerformance", districtPerformanceSchema);
