import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, tax, total, totalItems } = useCart();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSuccessModalOpen(true);
  };

  const handleFinishTransaction = () => {
    clearCart();
    setIsSuccessModalOpen(false);
  };

  return (
    <aside className="w-full lg:w-96 bg-white border border-gray-200 rounded-xl flex flex-col h-[calc(100vh-6rem)] sticky top-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Keranjang Belanja</h2>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {totalItems} Item
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
            <ShoppingCart className="w-12 h-12 stroke-1 mb-2 text-gray-300" />
            <p className="text-sm">Keranjang masih kosong</p>
            <p className="text-xs text-gray-400 mt-1">Pilih produk di samping untuk ditambahkan</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0 mr-3">
                <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  {formatCurrency(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-gray-100 text-gray-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.stock}
                    className="p-1 hover:bg-gray-100 text-gray-600 disabled:opacity-30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50/50 space-y-3 rounded-b-xl">
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>PPN (11%)</span>
              <span className="font-medium text-gray-800">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total Bayar</span>
              <span className="text-blue-600">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="md" onClick={clearCart} className="w-1/3">
              Batal
            </Button>
            <Button variant="primary" size="md" onClick={handleCheckout} className="w-2/3">
              Bayar Sekarang
            </Button>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Pembayaran Berhasil!</h3>
              <p className="text-xs text-gray-500 mt-1">Transaksi telah dicatat ke dalam sistem.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Item:</span>
                <span className="font-medium text-gray-800">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Pembayaran:</span>
                <span className="font-bold text-blue-600">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button variant="primary" size="md" className="w-full" onClick={handleFinishTransaction}>
              Selesai & Transaksi Baru
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}