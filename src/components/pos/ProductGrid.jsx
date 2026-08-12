import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageX } from 'lucide-react';

export function ProductGrid({ products = [], onAddToCart }) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        <PackageX className="w-12 h-12 mb-3 text-slate-400" />
        <h3 className="text-lg font-medium text-slate-700">Produk Tidak Ditemukan</h3>
        <p className="text-sm text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau filter kategori Anda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
