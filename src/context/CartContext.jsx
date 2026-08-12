import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pos_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error reading cart from storage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pos_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;
    setCartItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const existing = safePrev.find((item) => item.id === product.id);
      if (existing) {
        return safePrev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...safePrev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  return (
    <CartContext.Provider
      value={{
        cartItems: safeCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}