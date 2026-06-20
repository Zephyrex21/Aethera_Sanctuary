import express from "express";
import Flower from "../models/Flower.js";

const router = express.Router();

// GET /api/flowers  →  summary list (no heavy text fields)
router.get("/", async (_req, res) => {
  try {
    const flowers = await Flower.find(
      {},
      "_id name scientificName origin rarity image poeticLine tags featured order"
    ).sort({ order: 1 });
    res.json({ success: true, data: flowers, count: flowers.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/flowers/:id  →  full detail
router.get("/:id", async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, data: flower });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
