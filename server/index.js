import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import flowerRoutes from "./routes/flowers.js";

// override: true forces .env PORT=5000 to win over any system-level PORT env var
dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aethera";

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/flowers", flowerRoutes);
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", message: "Aethera API running 🌸" })
);

// Root route — helpful message if user accidentally opens the API port
app.get("/", (_req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Aethera API</title>
        <style>
          body { font-family: sans-serif; max-width: 500px; margin: 80px auto; color: #333; }
          a    { color: #9B4456; }
          code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h2>🌸 Aethera API is running on port ${PORT}</h2>
        <p>This is the <strong>backend API</strong>, not the frontend.</p>
        <p>👉 Open the app at:
          <a href="http://localhost:5173">http://localhost:5173</a>
        </p>
        <hr/>
        <p>Available endpoints:<br/>
          <a href="/api/flowers"><code>GET /api/flowers</code></a><br/>
          <a href="/api/health"><code>GET /api/health</code></a>
        </p>
      </body>
    </html>
  `);
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    // 404 handler — any request that didn't match a route above lands here.
    // Returns JSON (not Express's default HTML page) so the frontend's
    // `.json()` parsing never breaks on an unexpected route.
    app.use((req, res) => {
      res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.path}` });
    });

    // Global error handler — safety net for anything that throws outside
    // a route's own try/catch (e.g. malformed JSON bodies, sync errors).
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error("❌ Unhandled error:", err);
      res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
      });
    });

    app.listen(PORT, () => {
      console.log(`🌸 API  →  http://localhost:${PORT}`);
      console.log(`🖥️  App  →  http://localhost:5173  ← open this in browser`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
