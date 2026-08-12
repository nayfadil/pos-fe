import React from 'react';
import { Plus, Package } from 'lucide-react';
import { Card } from '../common/Card';

export function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Package className="w-12 h-12" />
          </div>
        )}
        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-xs text-gray-400 mb-2">Kode: {product.code}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-xs text-gray-500">Harga</p>
              <p className="font-bold text-indigo-600 text-sm">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>
            <p className={`text-xs ${isOutOfStock ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
              Stok: {product.stock}
            </p>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className={`w-full mt-3 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{isOutOfStock ? 'Stok Habis' : 'Tambah'}</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
