require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const seedTemplatesIfEmpty = require("./seed/seedTemplates");

const authRoutes = require("./routes/auth.routes");
const templatesRoutes = require("./routes/templates.routes");
const favoritesRoutes = require("./routes/favorites.routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: false }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/favorites", favoritesRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  await seedTemplatesIfEmpty();

  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
})();
