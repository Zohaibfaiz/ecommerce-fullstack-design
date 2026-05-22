import dotenv from "dotenv";
import { connectDatabase } from "../db/connect.js";
import Product from "../models/Product.js";
import { seedProducts } from "../data/seedProducts.js";

dotenv.config();

async function seed() {
  await connectDatabase();
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
  console.log(`Seeded ${seedProducts.length} products`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
