import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema(
  {
    _id: { type: String }, // slug e.g. "ghost-orchid"
    name: { type: String, required: true },
    scientificName: { type: String, required: true },
    origin: { type: String, required: true },
    rarity: { type: String, required: true },
    description: { type: String, required: true },
    interestingFact: { type: String, required: true },
    history: { type: String, required: true },
    uniqueness: { type: String, required: true },
    poeticLine: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String, enum: ["Extinct","Endangered","Rare","Unusual","Priceless","Mythic"] }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Flower", flowerSchema);
