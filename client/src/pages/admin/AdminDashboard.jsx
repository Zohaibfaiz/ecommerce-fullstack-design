import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../api/products";

function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, featured: 0, categories: 0 });

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setStats({
          total: products.length,
          featured: products.filter((p) => p.featured).length,
          categories: new Set(products.map((p) => p.category)).size,
        });
      })
      .catch(() => setStats({ total: 0, featured: 0, categories: 0 }));
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Overview of your catalog and store health.</p>
        </div>
        <Link className="primary-button" to="/admin/products">
          Manage products
        </Link>
      </header>
      <div className="admin-stats">
        <article className="admin-stat-card section-card">
          <span className="muted">Total products</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="admin-stat-card section-card">
          <span className="muted">Featured</span>
          <strong>{stats.featured}</strong>
        </article>
        <article className="admin-stat-card section-card">
          <span className="muted">Categories</span>
          <strong>{stats.categories}</strong>
        </article>
      </div>
    </div>
  );
}

export default AdminDashboard;
