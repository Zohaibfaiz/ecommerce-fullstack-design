import { createContext, useContext, useMemo, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext(null);

const defaultCart = [
  { productId: "wireless-headphones", quantity: 1 },
  { productId: "winter-jacket", quantity: 2 },
  { productId: "ceramic-pot", quantity: 3 },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(defaultCart);

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

  const enrichedItems = useMemo(
    () =>
      cartItems
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .filter((item) => item.product),
    [cartItems]
  );

  const itemCount = useMemo(
    () => enrichedItems.reduce((total, item) => total + item.quantity, 0),
    [enrichedItems]
  );

  const value = {
    cartItems,
    enrichedItems,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
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
