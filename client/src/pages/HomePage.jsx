import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { MiniProduct, ProductCard } from "../components/ProductCard";
import { PageError, PageLoading } from "../components/PageStatus";
import {
  assetPath,
  categories,
  electronicsItems,
  homeOutdoorItems,
  supplierRegions,
  uiAssets,
} from "../data/assets";

const services = [
  { title: "Source from industry hubs", image: assetPath("Image/backgrounds/image 107.png") },
  { title: "Customize your products", image: assetPath("Image/backgrounds/Mask group (1).png") },
  { title: "Fast, reliable shipping", image: assetPath("Image/backgrounds/image 106.png") },
  { title: "Product inspection", image: assetPath("Image/backgrounds/Mask group.png") },
];

function CategoryShowcase({ title, subtitle, image, items }) {
  return (
    <section className="section-card category-showcase">
      <div className="showcase-promo" style={{ backgroundImage: `url("${image}")` }}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <Link className="white-button" to="/products">Source now</Link>
      </div>
      <div className="mini-grid">
        {items.map((item) => (
          <MiniProduct key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = () => {
    setLoading(true);
    setError("");
    Promise.all([fetchProducts({ featured: true }), fetchProducts()])
      .then(([featured, all]) => {
        setFeaturedProducts(featured);
        setRecommended(all.slice(0, 10));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="page-shell">
        <PageLoading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-shell">
        <div className="container">
          <PageError message={error} onRetry={loadProducts} />
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="container hero-shell">
        <aside className="category-menu section-card">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              className={`category-link ${index === 0 ? "active" : ""}`}
              to={`/products?search=${encodeURIComponent(category.name)}`}
            >
              <img src={assetPath(category.icon)} alt="" aria-hidden="true" />
              <span>{category.name}</span>
            </Link>
          ))}
        </aside>

        <div
          className="hero-banner section-card"
          style={{ backgroundImage: `url("${assetPath("Image/backgrounds/Group 982.png")}")` }}
        >
          <div>
            <p>Latest trending</p>
            <h1>Electronic items</h1>
            <Link to="/products" className="white-button">
              Learn more
            </Link>
          </div>
        </div>

        <aside className="hero-side">
          <div className="user-card section-card">
            <div className="avatar">
              <img src={assetPath(uiAssets.userAvatar)} alt="User profile" />
            </div>
            <div>
              <p>Hi, user</p>
              <strong>Let's get started</strong>
            </div>
            <Link to="/products" className="primary-button full">
              Join now
            </Link>
            <Link to="/products" className="ghost-button full">
              Log in
            </Link>
          </div>
          {uiAssets.offerCards.map((offer) => (
            <div
              key={offer.text}
              className={`offer-card ${offer.tone}`}
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url("${assetPath(offer.image)}")`,
              }}
            >
              {offer.text}
            </div>
          ))}
        </aside>
      </section>

      <section className="container section-card deals-section">
        <div className="deals-copy">
          <h2>Deals and offers</h2>
          <p>Hygiene equipments</p>
          <div className="timer-row">
            <span>
              <strong>04</strong> Days
            </span>
            <span>
              <strong>13</strong> Hour
            </span>
            <span>
              <strong>34</strong> Min
            </span>
            <span>
              <strong>56</strong> Sec
            </span>
          </div>
        </div>
        <div className="deals-products">
          {featuredProducts.slice(0, 5).map((product) => (
            <Link key={product.id} className="deal-item" to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
              <strong>{product.name.split(" ").slice(0, 2).join(" ")}</strong>
              <span>
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="container showcase-stack">
        <CategoryShowcase
          title="Home and outdoor"
          subtitle="Soft interiors, kitchenware, and practical products for daily living."
          image={assetPath("Image/backgrounds/Group 969.png")}
          items={homeOutdoorItems}
        />
        <CategoryShowcase
          title="Consumer electronics"
          subtitle="Gadgets, accessories, and tech products ready for sourcing."
          image={assetPath("Image/backgrounds/image 98.png")}
          items={electronicsItems}
        />
      </div>

      <section
        className="container inquiry-banner"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(13, 110, 253, 0.92), rgba(0, 173, 181, 0.68)), url("${assetPath("Image/backgrounds/Banner-board-800x420 2.png")}")`,
        }}
      >
        <div>
          <h2>An easy way to send requests to all suppliers</h2>
          <p>Tell us what you need, and suppliers will share prices, stock, and delivery options.</p>
        </div>
        <form className="quote-card">
          <h3>Send quote to suppliers</h3>
          <input placeholder="What item you need?" aria-label="Requested item" />
          <textarea placeholder="Type more details" aria-label="Request details" />
          <div className="quote-row">
            <input placeholder="Quantity" aria-label="Quantity" />
            <select aria-label="Quantity unit" defaultValue="pcs">
              <option value="pcs">Pcs</option>
              <option value="box">Box</option>
            </select>
          </div>
          <button type="button" className="primary-button">
            Send inquiry
          </button>
        </form>
      </section>

      <section className="container content-section">
        <div className="section-heading">
          <h2>Recommended items</h2>
          <Link to="/products">View all</Link>
        </div>
        <div className="product-grid home-product-grid">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container content-section">
        <div className="section-heading">
          <h2>Our extra services</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card section-card">
              <img src={service.image} alt="" />
              <h3>{service.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="container content-section">
        <div className="section-heading">
          <h2>Suppliers by region</h2>
        </div>
        <div className="region-grid">
          {supplierRegions.map((region) => (
            <div key={region.country} className="region-item">
              <img src={region.flag} alt={region.country} />
              <div>
                <strong>{region.country}</strong>
                <span>{region.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
