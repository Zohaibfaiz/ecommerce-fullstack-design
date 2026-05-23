import { assetPath } from "../data/assets";
import { apiFetch } from "./http";

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

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "All") query.set("category", params.category);
  if (params.featured) query.set("featured", "true");

  const suffix = query.toString() ? `?${query}` : "";
  const products = await apiFetch(`/products${suffix}`);
  return products.map(normalizeProduct);
}

export async function fetchProductById(id) {
  const product = await apiFetch(`/products/${id}`);
  return normalizeProduct(product);
}

export async function fetchCategories() {
  return apiFetch("/products/meta/categories");
}

export async function createProduct(payload) {
  const product = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizeProduct(product);
}

export async function updateProduct(id, payload) {
  const product = await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return normalizeProduct(product);
}

export async function deleteProduct(id) {
  return apiFetch(`/products/${id}`, { method: "DELETE" });
}
