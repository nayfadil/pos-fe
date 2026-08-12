import React from 'react';
import { ProductGrid } from '../components/pos/ProductGrid';
import { CartSidebar } from '../components/pos/CartSidebar';

export function PosPage({
  products,
  onAddToCart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <ProductGrid
        products={products}
        onAddToCart={onAddToCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <CartSidebar />
    </div>
  );
}