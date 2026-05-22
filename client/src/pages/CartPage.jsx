import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { assetPath, uiAssets } from "../data/assets";
import { ProductCard } from "../components/ProductCard";
import { PageError, PageLoading } from "../components/PageStatus";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { enrichedItems, updateQuantity, removeItem } = useCart();
  const [savedItems, setSavedItems] = useState([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState("");

  useEffect(() => {
    fetchProducts()
      .then((items) => setSavedItems(items.slice(5, 9)))
      .catch((err) => setSavedError(err.message))
      .finally(() => setSavedLoading(false));
  }, []);

  const subtotal = useMemo(
    () => enrichedItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [enrichedItems]
  );
  const discount = subtotal > 100 ? 12 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal - discount + tax;

  return (
    <main className="page-shell cart-page">
      <div className="container breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Shopping cart</span>
      </div>

      <section className="container cart-layout">
        <div className="cart-items section-card">
          <div className="cart-heading">
            <h1>My cart ({enrichedItems.length})</h1>
            <Link to="/products">Back to shop</Link>
          </div>

          {enrichedItems.length ? (
            enrichedItems.map(({ product, quantity }) => (
              <article key={product.id} className="cart-row">
                <Link className="cart-image" to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="cart-row-main">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                  <p>{product.description}</p>
                  <div className="cart-actions-row">
                    <button type="button" onClick={() => removeItem(product.id)}>
                      Remove
                    </button>
                    <button type="button">Save for later</button>
                  </div>
                </div>
                <div className="cart-row-side">
                  <strong>${(product.price * quantity).toFixed(2)}</strong>
                  <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" onClick={() => updateQuantity(product.id, -1)}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Add products from the listing page to continue.</p>
              <Link className="primary-button" to="/products">
                Browse products
              </Link>
            </div>
          )}
        </div>

        <aside className="cart-summary-stack">
          <div className="coupon-card section-card">
            <h2>Have a coupon?</h2>
            <div className="coupon-row">
              <input placeholder="Add coupon" aria-label="Coupon code" />
              <button type="button">Apply</button>
            </div>
          </div>
          <div className="summary-card section-card">
            <div>
              <span>Subtotal:</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Discount:</span>
              <strong className="discount-text">-${discount.toFixed(2)}</strong>
            </div>
            <div>
              <span>Tax:</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button type="button" className="checkout-button full">
              Checkout
            </button>
            <div className="payment-row">
              {uiAssets.paymentMethods.map((method) => (
                <span key={method.label}>
                  <img src={assetPath(method.icon)} alt={method.label} />
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="container cart-benefits">
        {uiAssets.cartBenefits.map((benefit) => (
          <div key={benefit.title}>
            <img src={assetPath(benefit.image)} alt="" aria-hidden="true" />
            <div>
              <strong>{benefit.title}</strong>
              <span>{benefit.subtitle}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="container content-section saved-section section-card">
        <div className="section-heading">
          <h2>Saved for later</h2>
        </div>
        {savedLoading ? <PageLoading message="Loading saved items..." /> : null}
        {!savedLoading && savedError ? <PageError message={savedError} /> : null}
        {!savedLoading && !savedError ? (
          <div className="product-grid related-grid">
            {savedItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default CartPage;
