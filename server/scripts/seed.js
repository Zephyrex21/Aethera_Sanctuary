import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Flower from "../models/Flower.js";
import { flowersData } from "../data/flowers.js";

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".env") });

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/aethera";

async function seed() {
  let exitCode = 0;
  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");
    await Flower.deleteMany({});
    const inserted = await Flower.insertMany(flowersData);
    console.log(`🌸 Seeded ${inserted.length} flowers`);
    inserted.forEach((f) => console.log(`   ✓ ${f.name} [${f.tags.join(", ")}]`));
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(exitCode);
  }
}

seed();
