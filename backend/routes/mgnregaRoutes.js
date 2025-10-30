import express from "express";
import { getDistrictPerformance } from "../controllers/mgnregaController.js";

const router = express.Router();

router.post("/performance", getDistrictPerformance);

export default router;
