import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../api/products";
import { ProductCard, Rating } from "../components/ProductCard";
import { PageError, PageLoading } from "../components/PageStatus";
import { useCart } from "../context/CartContext";
import { assetPath, uiAssets } from "../data/assets";

function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = async () => {
    setLoading(true);
    setError("");
    try {
      const item = await fetchProductById(productId);
      setProduct(item);
      setSelectedImage(item.gallery?.[0] || item.image);
      setQuantity(1);

      const items = await fetchProducts({ category: item.category });
      const others = items.filter((entry) => entry.id !== item.id);
      setRelatedProducts(others.slice(0, 4));
      setSuggestions(others.slice(0, 5));
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const discountPercent = useMemo(() => {
    if (!product?.oldPrice) return 0;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product]);

  if (loading) {
    return (
      <main className="page-shell product-detail-page">
        <PageLoading message="Loading product details..." />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="page-shell product-detail-page">
        <div className="container">
          <PageError message={error || "Product not found"} onRetry={loadProduct} />
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell product-detail-page">
      <div className="container breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="container detail-layout section-card">
        <div className="gallery-panel">
          <div className="gallery-main">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="gallery-thumbs">
            {(product.gallery || [product.image]).map((image) => (
              <button
                key={image}
                type="button"
                className={selectedImage === image ? "active" : ""}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt="Product preview" />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <span className="stock-label">{product.stock > 0 ? "In stock" : "Out of stock"}</span>
          <h1>{product.name}</h1>
          <Rating value={product.rating} orders={product.orders} />
          <div className="tier-price-card">
            <div>
              <strong>${product.price.toFixed(2)}</strong>
              <span>50-100 pcs</span>
            </div>
            <div>
              <strong>${Math.max(product.price - 5, 1).toFixed(2)}</strong>
              <span>100-700 pcs</span>
            </div>
            <div>
              <strong>${Math.max(product.price - 10, 1).toFixed(2)}</strong>
              <span>700+ pcs</span>
            </div>
          </div>
          <div className="detail-actions">
            <div className="quantity-control" aria-label="Order quantity">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                +
              </button>
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                addToCart(product.id, quantity);
                navigate("/cart");
              }}
            >
              Add to cart
            </button>
            <Link className="ghost-button" to="/products">
              Continue shopping
            </Link>
          </div>

          <dl className="spec-list">
            <div>
              <dt>Price</dt>
              <dd>Negotiable</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>Material</dt>
              <dd>Premium mixed materials</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock} items available</dd>
            </div>
            <div>
              <dt>Protection</dt>
              <dd>Refund policy and inspection support</dd>
            </div>
          </dl>
        </div>

        <aside className="supplier-card">
          <div className="supplier-head">
            <div className="supplier-avatar">
              <img
                src={product.flag || assetPath(uiAssets.supplierAvatar)}
                alt={product.supplier}
              />
            </div>
            <div>
              <span>Supplier</span>
              <strong>{product.supplier}</strong>
            </div>
          </div>
          <div className="supplier-line">
            <img src={product.flag} alt={product.country} />
            <span>{product.country}</span>
          </div>
          <div className="supplier-line">
            <span>Verified seller</span>
          </div>
          <div className="supplier-line">
            <span>Worldwide shipping</span>
          </div>
          <button type="button" className="primary-button full">
            Send inquiry
          </button>
          <button type="button" className="ghost-button full">
            Seller profile
          </button>
          <button type="button" className="save-later">
            Save for later
          </button>
        </aside>
      </section>

      <section className="container detail-bottom-layout">
        <article className="section-card description-card">
          <div className="tab-row">
            <button type="button" className="active">
              Description
            </button>
            <button type="button">Reviews</button>
            <button type="button">Shipping</button>
            <button type="button">About seller</button>
          </div>
          <p>{product.description}</p>
          <p>
            Designed for wholesale buyers and retail sourcing. Each listing includes verified supplier details,
            flexible quantity pricing, and clear product specifications for faster purchasing decisions.
          </p>
          <table className="spec-table">
            <tbody>
              <tr>
                <th>Model</th>
                <td>Standard retail package</td>
              </tr>
              <tr>
                <th>Style</th>
                <td>Modern commercial product</td>
              </tr>
              <tr>
                <th>Certificate</th>
                <td>Quality checked</td>
              </tr>
              <tr>
                <th>Delivery</th>
                <td>7 to 15 business days</td>
              </tr>
            </tbody>
          </table>
        </article>

        <aside className="section-card may-like-card">
          <h2>You may like</h2>
          {suggestions.map((item) => (
            <Link key={item.id} className="may-like-item" to={`/products/${item.id}`}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>
                  ${item.price.toFixed(2)} - ${item.oldPrice?.toFixed(2) || item.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </aside>
      </section>

      <section className="container content-section">
        <div className="section-heading">
          <h2>Related products</h2>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>View category</Link>
        </div>
        <div className="product-grid related-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <section
        className="container discount-strip"
        style={{
          backgroundImage: `linear-gradient(90deg, #237cff, #005ade), url("${assetPath("Image/backgrounds/Group 982.png")}")`,
        }}
      >
        <div>
          <h2>Super discount on more than 100 USD</h2>
          <p>Save up to {discountPercent}% on bulk orders</p>
        </div>
        <Link className="orange-button" to="/products">
          Shop now
        </Link>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
