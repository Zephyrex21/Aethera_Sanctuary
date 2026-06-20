# 🌸 Aethera — MERN Stack Edition

A sanctuary for the world's rarest blooms.

---

## ⚡ Quick Start (copy-paste these 3 commands)

```bash
# 1. Install ALL dependencies (run this ONCE after extracting the zip)
npm run install:all

# 2. Seed the database (run this ONCE — needs MongoDB running)
npm run seed

# 3. Start the app
npm run dev
```

Then open **http://localhost:5173** in your browser. ← **NOT :3000, NOT :5000**

---

## 📋 Prerequisites

- **Node.js** v18 or higher → https://nodejs.org
- **MongoDB** running locally

  ```bash
  # Start MongoDB (if installed locally)
  mongod
  # OR use MongoDB Compass / Atlas
  ```

---

## ⚠️ Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `'vite' is not recognized` | Client deps not installed | Run `npm run install:all` first |
| `Cannot GET /` at localhost:3000 | You opened the API server, not the app | Go to **http://localhost:5173** |
| `Cannot GET /` at localhost:5000 | Same — you opened the API server | Go to **http://localhost:5173** |
| `MongoDB connection error` | MongoDB not running | Run `mongod` or check your Atlas URI in `server/.env` |
| API calls fail / flowers don't load | Database not seeded | Run `npm run seed` |

---

## 🔧 Configuration

Edit `server/.env` (already created with defaults):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aethera
```

To use **MongoDB Atlas**, replace `MONGODB_URI` with your Atlas connection string.

---

## 🛠 Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React 18 + Vite     |
| Styling   | Tailwind CSS v3     |
| Animation | Framer Motion       |
| Backend   | Node.js + Express   |
| Database  | MongoDB + Mongoose  |

---

## 📁 Project Structure

```
aethera-mern/
├── server/
│   ├── .env              ← PORT & MongoDB config
│   ├── index.js          ← Express entry (port 5000)
│   ├── models/Flower.js
│   ├── routes/flowers.js
│   ├── data/flowers.js   ← 30 flowers seed data
│   └── scripts/seed.js
└── client/               ← React + Vite (port 5173)
    ├── public/flowers/   ← 30 flower images
    └── src/
        ├── App.jsx
        ├── components/   ← 15 components
        └── utils/
```

---

## 🌐 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/flowers` | All 30 flowers (summary) |
| GET | `/api/flowers/:id` | Single flower detail |
| GET | `/api/health` | Health check |

---

Built with ♥ by Zephyr Labs
