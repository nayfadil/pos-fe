import React, { useState } from 'react';

const PosOrderSummary = () => {
  // State untuk daftar pesanan kasir
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Kopi Susu Gula Aren', price: 18000, qty: 2, note: 'Less ice' },
    { id: 2, name: 'Croissant Almond', price: 25000, qty: 1, note: '' },
    { id: 3, name: 'Nasi Goreng Spesial', price: 35000, qty: 1, note: 'Pedas sedang' },
    { id: 4, name: 'Es Teh Manis', price: 6000, qty: 2, note: '' },
  ]);

  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Handler untuk mengubah kuantitas
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Handler untuk menghapus item
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handler reset keranjang
  const handleClearAll = () => {
    setCartItems([]);
  };

  // Kalkulasi Total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxRate = 0.11; // PPN 11%
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  // Format ke Rupiah
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex h-screen w-full max-w-md flex-col bg-slate-50 border-l border-slate-200 font-sans shadow-lg">
      {/* Header Kasir */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Ringkasan Pesanan</h2>
          <p className="text-xs text-slate-500">Order ID: #POS-20231024-001</p>
        </div>
        <button
          onClick={handleClearAll}
          disabled={cartItems.length === 0}
          className="text-xs font-medium text-rose-600 hover:text-rose-700 disabled:opacity-40 disabled:hover:text-rose-600 transition-colors"
        >
          Kosongkan
        </button>
      </div>

      {/* Daftar Item (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-slate-400 space-y-2">
            <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-sm font-medium">Belum ada item dipilih</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-xl bg-white p-3.5 shadow-sm border border-slate-100 transition-all hover:border-slate-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{item.name}</h4>
                  <span className="text-xs font-medium text-slate-500">
                    {formatCurrency(item.price)}
                  </span>
                  {item.note && (
                    <p className="text-[11px] text-amber-600 italic mt-0.5">
                      * {item.note}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                  aria-label="Hapus item"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Kontrol Kuantitas & Subtotal Item */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:bg-slate-200 font-bold active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-700">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-white text-slate-600 shadow-sm hover:bg-slate-200 font-bold active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {formatCurrency(item.price * item.qty)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Ringkasan Pembayaran */}
      <div className="border-t border-slate-200 bg-white p-4 shadow-inner space-y-3">
        {/* Metode Pembayaran Ringkas */}
        <div className="grid grid-cols-3 gap-2 pb-1">
          {['cash', 'qris', 'card'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`py-1.5 text-xs font-semibold rounded-lg border uppercase transition-all ${
                paymentMethod === method
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Detail Perhitungan */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-slate-800">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>PPN (11%)</span>
            <span className="font-medium text-slate-800">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 text-sm font-bold text-slate-900">
            <span>Total Bayar</span>
            <span className="text-emerald-600">{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        {/* Tombol Bayar Hijau */}
        <button
          disabled={cartItems.length === 0}
          className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          <span>Bayar {cartItems.length > 0 ? formatCurrency(grandTotal) : ''}</span>
        </button>
      </div>
    </div>
  );
};

export default PosOrderSummary;