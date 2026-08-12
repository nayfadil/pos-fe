import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../constants/mockData';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('pos_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse products from localStorage:', e);
    }
    return Array.isArray(INITIAL_PRODUCTS) ? INITIAL_PRODUCTS : [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pos_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
    };
    setProducts((prev) => [...(Array.isArray(prev) ? prev : []), productToAdd]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    });
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((p) => p.id !== id);
    });
  };

  return {
    products: Array.isArray(products) ? products : [],
    addProduct,
    updateProduct,
    deleteProduct,
  };
}