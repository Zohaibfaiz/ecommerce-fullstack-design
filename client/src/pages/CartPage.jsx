import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function CartPage() {
  const { enrichedItems, updateQuantity, removeItem } = useCart();

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
                    <button type="button" onClick={() => removeItem(product.id)}>Remove</button>
                    <button type="button">Save for later</button>
                  </div>
                </div>
                <div className="cart-row-side">
                  <strong>${(product.price * quantity).toFixed(2)}</strong>
                  <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
                    <button type="button" onClick={() => updateQuantity(product.id, -1)}>-</button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product.id, 1)}>+</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Your cart is empty</h2>
              <p>Add products from the listing page to continue.</p>
              <Link className="primary-button" to="/products">Browse products</Link>
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
            <button type="button" className="checkout-button full">Checkout</button>
            <div className="payment-row">
              <span>Visa</span>
              <span>MC</span>
              <span>PayPal</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="container cart-benefits">
        <div>
          <strong>Secure payment</strong>
          <span>Have you ever finally just</span>
        </div>
        <div>
          <strong>Customer support</strong>
          <span>Have you ever finally just</span>
        </div>
        <div>
          <strong>Free delivery</strong>
          <span>Have you ever finally just</span>
        </div>
      </section>

      <section className="container content-section saved-section section-card">
        <div className="section-heading">
          <h2>Saved for later</h2>
        </div>
        <div className="product-grid related-grid">
          {products.slice(5, 9).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CartPage;
