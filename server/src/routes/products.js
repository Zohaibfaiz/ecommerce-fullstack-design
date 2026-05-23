import { Router } from "express";
import Product from "../models/Product.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

function buildFilter(query) {
  const filter = {};
  const { search, category, featured } = query;

  if (category && category !== "All") {
    filter.category = category;
  }

  if (featured === "true") {
    filter.featured = true;
  }

  if (search) {
    const pattern = new RegExp(search.trim(), "i");
    filter.$or = [{ name: pattern }, { category: pattern }];
  }

  return filter;
}

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find(buildFilter(req.query)).sort({ featured: -1, name: 1 }).lean();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/meta/categories", async (_req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories.sort());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireAdmin, async (req, res, next) => {
  try {
    const { id, name, price, image, description, category, stock } = req.body;
    if (!id || !name || price == null || !image || !description || !category || stock == null) {
      return res.status(400).json({
        message: "Required fields: id, name, price, image, description, category, stock",
      });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Product id already exists" });
    }
    next(error);
  }
});

router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id }).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted", product });
  } catch (error) {
    next(error);
  }
});

export default router;
