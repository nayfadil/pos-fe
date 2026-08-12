import React from 'react';
import ProductGrid from '../components/pos/ProductGrid';
import CartSidebar from '../components/pos/CartSidebar';

export function PosPage() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <ProductGrid />
      </div>
      <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col">
        <CartSidebar />
      </div>
    </div>
  );
}