import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    oldPrice: { type: Number, min: 0 },
    gallery: [{ type: String }],
    rating: { type: Number, min: 0, max: 5, default: 4 },
    orders: { type: Number, min: 0, default: 0 },
    supplier: { type: String, default: "" },
    country: { type: String, default: "" },
    flag: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
