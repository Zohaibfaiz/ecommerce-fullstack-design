import mongoose from "mongoose";
import Product from "../models/Product.js";
import { seedProducts } from "../data/seedProducts.js";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce-fullstack-design";
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

export async function seedDatabaseIfEmpty() {
  const count = await Product.countDocuments();
  if (count > 0) {
    console.log(`Database already has ${count} products`);
    return;
  }

  await Product.insertMany(seedProducts);
  console.log(`Seeded ${seedProducts.length} products`);
}
