import React from 'react';
import { Plus } from 'lucide-react';

export function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock <= 0;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="relative h-36 w-full bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80';
            }}
          />
          <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded">
            {product.code}
          </span>
          <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
          <p className="text-blue-600 font-bold text-base mt-1">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>

      <div className="p-3 pt-0 flex items-center justify-between gap-2 border-t border-gray-50 mt-2">
        <span className={`text-xs ${isOutOfStock ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
          {isOutOfStock ? 'Stok Habis' : `Stok: ${product.stock}`}
        </span>

        <button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
            isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah
        </button>
      </div>
    </div>
  );
}