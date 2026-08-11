import React, { useState } from 'react';

// Icon Components (Inline SVG for self-containment)
const ShieldCheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BankIcon = () => (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V5m0 16V5" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5 text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 014 0m6 0a2 2 0 104 0m-4 0a2 2 0 014 0" />
  </svg>
);

// Checkout Card Component
const CheckoutCard = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Wireless Noise-Canceling Headphones',
      variant: 'Midnight Black',
      price: 1299000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    },
    {
      id: 2,
      name: 'Ergonomic Mechanical Keyboard',
      variant: 'RGB / Tactile Switch',
      price: 850000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'DISKON50' && !promoApplied) {
      setDiscount(50000);
      setPromoApplied(true);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 25000;
  const total = subtotal + shippingCost - discount;

  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Section: Details, Items, and Payment */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Detail Pesanan</h2>
            <p className="text-sm text-slate-500 mt-1">
              Periksa item dan pilih metode pembayaran Anda.
            </p>
          </div>

          {/* Cart Items List */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Produk ({items.length})
            </h3>
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4 first:pt-0">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.variant}</p>
                      <p className="text-sm font-bold text-indigo-600 mt-1">{formatIDR(item.price)}</p>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-semibold text-slate-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Alamat Pengiriman
            </h3>
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <TruckIcon />
                <div>
                  <p className="text-sm font-semibold text-slate-800">Budi Santoso <span className="text-xs font-normal text-slate-500">(Utama)</span></p>
                  <p className="text-xs text-slate-500 mt-1">
                    Jl. Sudirman No. 42, Kebayoran Baru, Jakarta Selatan, 12190
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">+62 812-3456-7890</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                Ubah
              </button>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Metode Pembayaran
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', name: 'Kartu Kredit', icon: <CreditCardIcon /> },
                { id: 'e-wallet', name: 'E-Wallet', icon: <WalletIcon /> },
                { id: 'bank', name: 'Transfer Bank', icon: <BankIcon /> },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all ${
                    paymentMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                  }`}
                >
                  <div className="mb-2">{method.icon}</div>
                  <span className="text-xs font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary & Checkout CTA */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Ringkasan Pembayaran</h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Kode Promo (cth: DISKON50)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="flex-1 px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white disabled:bg-slate-100"
              />
              <button
                type="submit"
                disabled={promoApplied || !promoCode}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {promoApplied ? 'Terpakai' : 'Gunakan'}
              </button>
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm pt-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Produk</span>
                <span className="font-medium text-slate-800">{formatIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Biaya Pengiriman</span>
                <span className="font-medium text-slate-800">{formatIDR(shippingCost)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Diskon Promo</span>
                  <span>-{formatIDR(discount)}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-bold text-slate-900">Total Pembayaran</span>
                  <p className="text-xs text-slate-400 mt-0.5">Termasuk PPN jika berlaku</p>
                </div>
                <span className="text-xl font-extrabold text-indigo-600">{formatIDR(total)}</span>
              </div>
            </div>
          </div>

          {/* CTA & Guarantees */}
          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={() => alert('Pesanan Berhasil Diproses!')}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all text-sm flex items-center justify-center gap-2"
            >
              <span>Bayar Sekarang</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <div className="flex items-center justify-center text-center text-xs text-slate-500 pt-2">
              <ShieldCheckIcon />
              <span>Transaksi Aman & Terenkripsi 256-bit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Entry Component
export default function Main() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50/30 to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-12 font-sans">
      <div className="w-full max-w-5xl">
        <CheckoutCard />
      </div>
    </main>
  );
}