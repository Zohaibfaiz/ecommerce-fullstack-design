import { useEffect, useState } from "react";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../api/products";
import { PageError, PageLoading } from "../../components/PageStatus";

const emptyForm = {
  id: "",
  name: "",
  price: "",
  oldPrice: "",
  image: "Image/tech/8.png",
  description: "",
  category: "Electronics",
  stock: "",
  rating: "4.5",
  orders: "0",
  supplier: "",
  country: "",
  flag: "Layout1/Image/flags/US@2x.png",
  featured: false,
};

function stripAssetPath(value) {
  if (!value) return value;
  return value.replace(/^\/assets\//, "").trim();
}

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    setError("");
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      id: product.id,
      name: product.name,
      price: String(product.price),
      oldPrice: product.oldPrice != null ? String(product.oldPrice) : "",
      image: stripAssetPath(product.image),
      description: product.description,
      category: product.category,
      stock: String(product.stock),
      rating: String(product.rating ?? 4.5),
      orders: String(product.orders ?? 0),
      supplier: product.supplier || "",
      country: product.country || "",
      flag: stripAssetPath(product.flag) || "Layout1/Image/flags/US@2x.png",
      featured: Boolean(product.featured),
    });
    setMessage("");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildPayload = () => ({
    id: form.id.trim(),
    name: form.name.trim(),
    price: Number(form.price),
    oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
    image: stripAssetPath(form.image),
    description: form.description.trim(),
    category: form.category.trim(),
    stock: Number(form.stock),
    rating: Number(form.rating),
    orders: Number(form.orders),
    supplier: form.supplier.trim(),
    country: form.country.trim(),
    flag: stripAssetPath(form.flag),
    featured: form.featured,
    gallery: [stripAssetPath(form.image)],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = buildPayload();
      if (editingId) {
        await updateProduct(editingId, payload);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(payload);
        setMessage("Product created successfully.");
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete product "${id}"?`)) return;
    setError("");
    try {
      await deleteProduct(id);
      setMessage("Product deleted.");
      if (editingId === id) resetForm();
      loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p className="muted">Add, edit, or remove catalog items (admin only).</p>
        </div>
      </header>

      <div className="admin-split">
        <section className="admin-form-panel section-card">
          <h2>{editingId ? `Edit: ${editingId}` : "Add new product"}</h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <label>
                Product ID
                <input name="id" value={form.id} onChange={handleChange} required disabled={Boolean(editingId)} />
              </label>
              <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Price (USD)
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
              </label>
              <label>
                Old price
                <input name="oldPrice" type="number" min="0" step="0.01" value={form.oldPrice} onChange={handleChange} />
              </label>
              <label>
                Stock
                <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
              </label>
              <label>
                Category
                <input name="category" value={form.category} onChange={handleChange} required />
              </label>
              <label className="full">
                Image path (assets folder)
                <input name="image" value={form.image} onChange={handleChange} required placeholder="Image/tech/8.png" />
              </label>
              <label className="full">
                Description
                <textarea name="description" value={form.description} onChange={handleChange} required rows={3} />
              </label>
              <label>
                Supplier
                <input name="supplier" value={form.supplier} onChange={handleChange} />
              </label>
              <label>
                Country
                <input name="country" value={form.country} onChange={handleChange} />
              </label>
              <label className="full">
                Flag path
                <input name="flag" value={form.flag} onChange={handleChange} />
              </label>
              <label>
                Rating
                <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} />
              </label>
              <label>
                Orders
                <input name="orders" type="number" min="0" value={form.orders} onChange={handleChange} />
              </label>
              <label className="checkbox-field">
                <input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
                Featured on home page
              </label>
            </div>
            {error ? <p className="form-error">{error}</p> : null}
            {message ? <p className="form-success">{message}</p> : null}
            <div className="admin-form-actions">
              <button type="submit" className="primary-button" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update product" : "Create product"}
              </button>
              {editingId ? (
                <button type="button" className="ghost-button" onClick={resetForm}>
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </section>

        <section className="admin-table-panel section-card">
          <h2>Catalog ({products.length})</h2>
          {loading ? <PageLoading message="Loading catalog..." /> : null}
          {!loading && error && !products.length ? <PageError message={error} onRetry={loadProducts} /> : null}
          {!loading ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-product-cell">
                          <img src={product.image} alt="" />
                          <div>
                            <strong>{product.name}</strong>
                            <span className="muted">{product.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button type="button" className="ghost-button" onClick={() => startEdit(product)}>
                            Edit
                          </button>
                          <button type="button" className="danger-button" onClick={() => handleDelete(product.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default AdminProductsPage;
