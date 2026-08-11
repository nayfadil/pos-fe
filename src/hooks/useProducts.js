import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants/mockData';

export const useProducts = () => {
  const [products] = useState(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return {
    products: filteredProducts,
    categories: CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  };
};