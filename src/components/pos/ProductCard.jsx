import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const ProductCard = ({ product, onAddToCart }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow group">
      <div className="relative h-36 overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          {product.category}
        </span>
      </div>
      <Card.Body className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{product.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Stok: {product.stock}</p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-indigo-600 text-sm">{formattedPrice}</span>
          <Button
            size="sm"
            variant="primary"
            onClick={() => onAddToCart(product)}
            className="text-xs font-semibold"
          >
            + Tambah
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};