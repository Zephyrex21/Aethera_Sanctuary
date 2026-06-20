# 🌸 Aethera — Sanctuary of Rare Blooms

A digital sanctuary showcasing 30 of the world's rarest and strangest flowers — from corpse flowers to ghost orchids.
Built as a full MERN stack app with a glassmorphism UI, smooth animations, and a real backend powering every bloom's story.

**Live:** https://aethera-sanctuary.vercel.app · **API Docs:** https://aethera-api.onrender.com/docs

---

## ⚡ Quick Start (local dev)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Add your MongoDB Atlas URI to server/.env (see Configuration below)

# 3. Seed the database (run once)
npm run seed

# 4. Start the app
npm run dev
```

Open **http://localhost:5173** in your browser. ← NOT :5000 (that's the API)

---

## 📋 Prerequisites

- **Node.js** v18+ → https://nodejs.org
- A **MongoDB Atlas** account (free tier) → https://mongodb.com/atlas

---

## 🔧 Configuration

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aethera?retryWrites=true&w=majority
```

Get your connection string from Atlas → **Connect → Drivers**. This file is gitignored — never commit it.

---

## ⚠️ Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `'vite' is not recognized` | Run `npm run install:all` first |
| `Cannot GET /` at :5000 | That's the API — open **:5173** instead |
| `MongoDB connection error` | Check `MONGODB_URI` in `server/.env` and Atlas Network Access whitelist |
| Flowers don't load | Run `npm run seed` |

---

## 🛠 Tech Stack

| Layer     | Technology               |
|-----------|---------------------------|
| Frontend  | React 18 + Vite           |
| Styling   | Tailwind CSS v3            |
| Animation | Framer Motion              |
| Backend   | Node.js + Express          |
| Database  | MongoDB Atlas + Mongoose   |
| Hosting   | Vercel (frontend) · Render (backend) |

---

## 📁 Project Structure

```
aethera-mern/
├── server/              ← Express API (Render)
│   ├── index.js
│   ├── models/Flower.js
│   ├── routes/flowers.js
│   └── scripts/seed.js
└── client/              ← React + Vite (Vercel)
    ├── vercel.json       ← proxies /api to Render backend
    ├── public/flowers/   ← 30 flower images
    └── src/
```

---

## 🌐 API Endpoints

Full interactive docs (Swagger UI): **https://aethera-api.onrender.com/docs**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/flowers` | All 30 flowers (summary) |
| GET | `/api/flowers/:id` | Single flower detail |
| GET | `/api/health` | Health check |

---

Built with ♥ by Zephyr Labs
