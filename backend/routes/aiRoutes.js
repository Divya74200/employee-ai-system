import express from "express";

import {
  generateRecommendation,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/recommend", generateRecommendation);

export default router;