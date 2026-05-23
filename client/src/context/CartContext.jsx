import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api/products";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "ecommerce_cart_v1";

const defaultCart = [
  { productId: "wireless-headphones", quantity: 1 },
  { productId: "winter-jacket", quantity: 2 },
];

function readStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return defaultCart;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultCart;
  } catch {
    return defaultCart;
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readStoredCart);
  const [catalog, setCatalog] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3000);
  };

  useEffect(() => {
    fetchProducts()
      .then(setCatalog)
      .catch((error) => console.error("Cart catalog load failed:", error.message));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId, quantity = 1) => {
    const product = catalog.find((p) => p.id === productId);
    const productName = product ? product.name : "Product";

    setCartItems((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + Number(quantity) }
            : item
        );
      }
      return [...items, { productId, quantity: Number(quantity) }];
    });

    addToast(`Added to cart: ${productName}`, "success");
  };

  const updateQuantity = (productId, direction) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + direction) }
          : item
      )
    );
  };

  const removeItem = (productId) => {
    const product = catalog.find((p) => p.id === productId);
    const productName = product ? product.name : "Product";

    setCartItems((items) => items.filter((item) => item.productId !== productId));
    addToast(`Removed from cart: ${productName}`, "success");
  };

  const clearCart = () => {
    setCartItems([]);
    addToast("Shopping cart cleared.", "success");
  };

  const enrichedItems = useMemo(
    () =>
      cartItems
        .map((item) => ({
          ...item,
          product: catalog.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [cartItems, catalog]
  );

  const itemCount = useMemo(
    () => enrichedItems.reduce((total, item) => total + item.quantity, 0),
    [enrichedItems]
  );

  const value = {
    cartItems,
    catalog,
    enrichedItems,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`cart-toast ${toast.type}`}>
            <div className="cart-toast-icon">✓</div>
            <div className="cart-toast-content">
              <strong>Shopping Cart</strong>
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              className="cart-toast-close"
              onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
