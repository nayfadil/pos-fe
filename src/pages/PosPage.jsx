import React from 'react';
import { ProductGrid } from '../components/pos/ProductGrid';
import { CartSidebar } from '../components/pos/CartSidebar';

export function PosPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row overflow-hidden bg-slate-100">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <ProductGrid />
      </div>
      <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-slate-200 bg-white h-full overflow-hidden">
        <CartSidebar />
      </div>
    </div>
  );
}