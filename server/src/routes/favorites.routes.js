const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Template = require("../models/Template");

const router = express.Router();

// POST /api/favorites/:templateId (add to favorites) - authenticated
router.post("/:templateId", auth, async (req, res) => {
  try {
    const { templateId } = req.params;

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ message: "Template not found" });

    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const already = user.favorites.some((id) => String(id) === String(templateId));
    if (!already) {
      user.favorites.push(templateId);
      await user.save();
    }

    return res.json({ message: already ? "Already favorited" : "Added to favorites" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid template id" });
  }
});

// GET /api/favorites - authenticated
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("favorites");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    return res.json(user.favorites || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
