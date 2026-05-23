import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";
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
  } else {
    await Product.insertMany(seedProducts);
    console.log(`Seeded ${seedProducts.length} products`);
  }

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@brand.com").toLowerCase();
  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    const password = process.env.ADMIN_PASSWORD || "admin123";
    await User.create({
      name: "Store Admin",
      email: adminEmail,
      password: await bcrypt.hash(password, 10),
      role: "admin",
    });
    console.log(`Admin user created: ${adminEmail}`);
  }
}
