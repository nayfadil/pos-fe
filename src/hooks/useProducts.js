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
    return INITIAL_PRODUCTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    try {
      localStorage.setItem('pos_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products:', e);
    }
  }, [products]);

  const safeProducts = Array.isArray(products) ? products : INITIAL_PRODUCTS;

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
    };
    setProducts((prev) => Array.isArray(prev) ? [productWithId, ...prev] : [productWithId]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      (Array.isArray(prev) ? prev : []).map((p) =>
        p.id === id ? { ...p, ...updatedData, price: Number(updatedData.price), stock: Number(updatedData.stock) } : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => (Array.isArray(prev) ? prev : []).filter((p) => p.id !== id));
  };

  const filteredProducts = safeProducts.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes((searchQuery || '').toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    products: safeProducts,
    filteredProducts: Array.isArray(filteredProducts) ? filteredProducts : [],
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}