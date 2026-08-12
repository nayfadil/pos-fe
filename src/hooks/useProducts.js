import { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, CATEGORIES } from '../constants/mockData';

export function useProducts() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pos_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    localStorage.setItem('pos_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const item = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };
    setProducts((prev) => [item, ...prev]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
              price: Number(updatedData.price),
              stock: Number(updatedData.stock)
            }
          : item
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return {
    products: filteredProducts,
    allProducts: products,
    categories: CATEGORIES,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct
  };
}