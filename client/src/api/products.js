import { assetPath } from "../data/assets";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

function toAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith("http") || path.startsWith("/assets/")) return path;
  const clean = path.replace(/^\/assets\//, "");
  return assetPath(clean);
}

export function normalizeProduct(product) {
  if (!product) return product;
  return {
    ...product,
    image: toAssetUrl(product.image),
    flag: toAssetUrl(product.flag),
    gallery: (product.gallery || []).map(toAssetUrl),
  };
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data;
}

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.featured) query.set("featured", "true");

  const suffix = query.toString() ? `?${query}` : "";
  const response = await fetch(`${API_BASE}/products${suffix}`);
  const products = await parseResponse(response);
  return products.map(normalizeProduct);
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE}/products/${id}`);
  const product = await parseResponse(response);
  return normalizeProduct(product);
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/products/meta/categories`);
  const categories = await parseResponse(response);
  return categories;
}
