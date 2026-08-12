import React, { useState } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/pos/ProductGrid';
import { CartSidebar } from '../components/pos/CartSidebar';

export function PosPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentPage="pos" onNavigate={onNavigate} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ProductGrid
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="lg:col-span-1">
          <CartSidebar />
        </div>
      </main>
    </div>
  );
}