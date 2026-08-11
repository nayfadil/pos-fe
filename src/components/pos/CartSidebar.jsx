import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Button } from '../common/Button';

export const CartSidebar = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    discountPercent,
    setDiscountPercent,
    grandTotal
  } = useCart();

  const formatCurrency = (val) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full lg:w-96 bg-white border border-slate-200/80 rounded-xl shadow-sm flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">Pesanan Saat Ini</h2>
          <p className="text-xs text-slate-400">{cartItems.length} Item dipilih</p>
        </div>
        {cartItems.length > 0 && (
          <Button size="sm" variant="ghost" className="text-rose-600 hover:bg-rose-50" onClick={clearCart}>
            Reset
          </Button>
        )}
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2">
            <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-sm font-medium">Keranjang Masih Kosong</p>
          </div>
        ) : (
          cartItems.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex-1 pr-2">
                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{product.name}</h4>
                <span className="text-xs font-bold text-indigo-600">{formatCurrency(product.price)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-slate-200 rounded-md bg-white">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 rounded-l-md font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-semibold text-slate-700">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 rounded-r-md font-bold text-xs"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Calculations */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>Subtotal</span>
          <span className="font-medium text-slate-700">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500 items-center">
          <span>Diskon (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            className="w-14 text-right px-1.5 py-0.5 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>Pajak (10%)</span>
          <span className="font-medium text-slate-700">{formatCurrency(tax)}</span>
        </div>
        <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
          <span className="font-bold text-slate-800 text-sm">Total</span>
          <span className="font-extrabold text-indigo-600 text-lg">{formatCurrency(grandTotal)}</span>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full mt-3 shadow-md shadow-indigo-200 font-bold"
          disabled={cartItems.length === 0}
          onClick={() => alert(`Pembayaran Sukses! Total: ${formatCurrency(grandTotal)}`)}
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
};