import React from 'react';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../../constants/mockData';

export function ProductGrid({
  products = [],
  selectedCategory = 'Semua',
  onSelectCategory,
  onAddToCart,
  searchQuery = ''
}) {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeCategories = Array.isArray(CATEGORIES) ? CATEGORIES : ['Semua', 'Makanan', 'Minuman', 'Cemilan'];

  const filteredProducts = safeProducts.filter((product) => {
    if (!product) return false;
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = (product.name || '').toLowerCase().includes((searchQuery || '').toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className=