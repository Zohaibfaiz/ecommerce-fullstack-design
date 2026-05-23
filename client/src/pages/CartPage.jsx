import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { assetPath, uiAssets } from "../data/assets";
import { ProductCard } from "../components/ProductCard";
import { PageError, PageLoading } from "../components/PageStatus";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function CartPage() {
  const { enrichedItems, updateQuantity, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [savedItems, setSavedItems] = useState([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState("");

  // Checkout modal states
  const [showCheckout, setShowCheckout] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

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

  const handleCheckoutClick = () => {
    if (!enrichedItems.length) return;
    if (!user) {
      // Redirect to login page and remember to redirect back to cart
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    // Prefill name if user is logged in
    setShippingName(user.name || "");
    setShowCheckout(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !shippingPhone) {
      alert("Please fill out all shipping details.");
      return;
    }
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setIsOrdered(false);
      setShippingAddress("");
      setShippingPhone("");
    }, 3000);
  };

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
            <button
              type="button"
              className="checkout-button full"
              onClick={handleCheckoutClick}
              disabled={!enrichedItems.length}
            >
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

      {/* Premium Checkout Modal */}
      {showCheckout && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <div className="checkout-modal-header">
              <h2>Secure Checkout</h2>
              <button
                type="button"
                className="checkout-modal-close"
                onClick={() => setShowCheckout(false)}
                disabled={isOrdered}
              >
                &times;
              </button>
            </div>
            <div className="checkout-modal-body">
              {isOrdered ? (
                <div className="checkout-modal-success">
                  <div className="checkout-success-icon">✓</div>
                  <h3>Order Placed Successfully!</h3>
                  <p>Thank you for your purchase. Your order has been registered and is being processed.</p>
                </div>
              ) : (
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                  <label>
                    Full Name
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Shipping Address
                    <input
                      type="text"
                      placeholder="e.g. 123 Main St, New York"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Phone Number
                    <input
                      type="tel"
                      placeholder="e.g. +1 234 567 890"
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                      required
                    />
                  </label>
                  <div className="checkout-summary-bar">
                    <span>Grand Total:</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  <button type="submit" className="primary-button full" style={{ marginTop: "10px" }}>
                    Confirm & Place Order
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;
