import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

const sortOptions = ["Featured", "Price: low to high", "Price: high to low", "Best rating"];

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("Featured");

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    const items = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    return [...items].sort((a, b) => {
      if (sort === "Price: low to high") return a.price - b.price;
      if (sort === "Price: high to low") return b.price - a.price;
      if (sort === "Best rating") return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured);
    });
  }, [searchTerm, selectedCategory, sort]);

  const chooseCategory = (category) => {
    const next = new URLSearchParams(searchParams);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    setSearchParams(next);
  };

  return (
    <main className="page-shell products-page">
      <div className="container breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Products</span>
      </div>

      <section className="container listing-layout">
        <aside className="filters-panel section-card">
          <div className="filter-block">
            <h3>Category</h3>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "active" : ""}
                onClick={() => chooseCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="filter-block">
            <h3>Brands</h3>
            {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((brand) => (
              <label key={brand}>
                <input type="checkbox" /> {brand}
              </label>
            ))}
          </div>
          <div className="filter-block">
            <h3>Features</h3>
            {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large memory'].map((feature) => (
              <label key={feature}>
                <input type="checkbox" /> {feature}
              </label>
            ))}
          </div>
          <div className="filter-block">
            <h3>Price range</h3>
            <div className="range-line" />
            <div className="price-inputs">
              <input placeholder="Min" aria-label="Minimum price" />
              <input placeholder="Max" aria-label="Maximum price" />
            </div>
            <button type="button" className="ghost-button full">Apply</button>
          </div>
        </aside>

        <div className="listing-content">
          <div className="mobile-filter-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "active" : ""}
                onClick={() => chooseCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="listing-toolbar section-card">
            <div>
              <strong>{filteredProducts.length} items</strong>
              <span> in {selectedCategory === "All" ? "all categories" : selectedCategory}</span>
              {searchTerm ? <p>Search: {searchTerm}</p> : null}
            </div>
            <label className="verified-label">
              <input type="checkbox" defaultChecked /> Verified only
            </label>
            <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div className="view-switch" aria-label="View switcher">
              <button className={view === "grid" ? "active" : ""} type="button" onClick={() => setView("grid")}>Grid</button>
              <button className={view === "list" ? "active" : ""} type="button" onClick={() => setView("list")}>List</button>
            </div>
          </div>

          <div className={view === "grid" ? "product-grid listing-grid" : "listing-list"}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant={view} />
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state section-card">
              <h2>No products found</h2>
              <p>Try another product name or category.</p>
              <button type="button" className="primary-button" onClick={() => setSearchParams({})}>Clear filters</button>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;
