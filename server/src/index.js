require("dotenv").config();

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const seedTemplatesIfEmpty = require("./seed/seedTemplates");

const authRoutes = require("./routes/auth.routes");
const templatesRoutes = require("./routes/templates.routes");
const favoritesRoutes = require("./routes/favorites.routes");

const app = express();

// ✅ Better CORS handling for local + deployed frontend
const allowedOrigins =
  process.env.CLIENT_URL === "*"
    ? true
    : process.env.CLIENT_URL?.split(",").map((s) => s.trim());

app.use(
  cors({
    origin: allowedOrigins || true,
    credentials: false,
  })
);

app.use(express.json());

// ✅ Root route so Render URL looks fine
app.get("/", (req, res) => {
  res.send("Mini SaaS Template Store API is running ✅");
});

// ✅ Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/favorites", favoritesRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB(process.env.MONGO_URI);
  await seedTemplatesIfEmpty();

  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})();