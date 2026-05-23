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

  useEffect(() => {
    fetchProducts()
      .then(setCatalog)
      .catch((error) => console.error("Cart catalog load failed:", error.message));
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId, quantity = 1) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.productId === productId);
      if (existing) {
        return items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...items, { productId, quantity }];
    });
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
    setCartItems((items) => items.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCartItems([]);

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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
