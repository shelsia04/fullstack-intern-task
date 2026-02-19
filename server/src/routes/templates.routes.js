const express = require("express");
const Template = require("../models/Template");

const router = express.Router();

// GET /api/templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    return res.json(templates);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/templates/:id
router.get("/:id", async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: "Template not found" });
    return res.json(template);
  } catch (err) {
    return res.status(400).json({ message: "Invalid template id" });
  }
});

module.exports = router;
