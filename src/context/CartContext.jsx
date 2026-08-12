import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pos_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pos_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;
    setCartItems((prevItems) => {
      const safePrev = Array.isArray(prevItems) ? prevItems : [];
      const existing = safePrev.find((item) => item.id === product.id);
      if (existing) {
        return safePrev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
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
    setCartItems((prevItems) => {
      const safePrev = Array.isArray(prevItems) ? prevItems : [];
      return safePrev.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const safePrev = Array.isArray(prevItems) ? prevItems : [];
      return safePrev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    const safeCart = Array.isArray(cartItems) ? cartItems : [];
    return safeCart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
  };

  const getTotalItems = () => {
    const safeCart = Array.isArray(cartItems) ? cartItems : [];
    return safeCart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: Array.isArray(cartItems) ? cartItems : [],
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}