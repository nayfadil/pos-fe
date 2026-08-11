import React, { createContext, useState, useMemo } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);

  const addItem = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const tax = useMemo(() => Math.round(subtotal * 0.1), [subtotal]);
  const discountAmount = useMemo(() => Math.round((subtotal * discountPercent) / 100), [subtotal, discountPercent]);
  const grandTotal = useMemo(() => subtotal + tax - discountAmount, [subtotal, tax, discountAmount]);

  const value = {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    discountPercent,
    setDiscountPercent,
    discountAmount,
    grandTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};