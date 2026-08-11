import React, { useState } from 'react';
import Header from '../components/Header';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle2, Search } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Kopi Susu Gula Aren', price: 18000, category: 'Minuman' },
  { id: 2, name: 'Roti Bakar Cokelat', price: 15000, category: 'Makanan' },
  { id: 3, name: 'Teh Manis Dingin', price: 6000, category: 'Minuman' },
  { id: 4, name: 'Nasi Goreng Spesial', price: 25000, category: 'Makanan' },
  { id: 5, name: 'French Fries', price: 12000, category: 'Cemilan' },
  { id: 6, name: 'Air Mineral 600ml', price: 4000, category: 'Minuman' },
];

export default function PosPage() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
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

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowSuccessModal(true);
  };

  const handleNewTransaction = () => {
    setCart([]);
    setShowSuccessModal(false);
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Produk */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama menu/produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-sm mt-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <div className="w-7 h-7 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Keranjang Transaksi */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between h-[calc(100vh-140px)] sticky top-20">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-slate-800 text-base">Keranjang Pesanan</h2>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-340px)] my-4 space-y-3 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Belum ada item yang dipilih
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <div className="flex-1 pr-2">
                      <h4 className="font-medium text-slate-800 text-xs line-clamp-1">{item.name}</h4>
                      <span className="text-xs text-slate-500 font-semibold">
                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-4 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 text-red-400 hover:text-red-600 ml-1 flex items-center justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Total Pembayaran</span>
              <span className="text-lg font-bold text-indigo-600">
                Rp {totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
            <button
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </main>

      {/* Modal Transaksi Berhasil */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl transform transition-all animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Transaksi Berhasil!</h3>
            <p className="text-xs text-slate-500 mt-1">
              Total Transaksi: <strong className="text-slate-700">Rp {totalAmount.toLocaleString('id-ID')}</strong>
            </p>
            <button
              onClick={handleNewTransaction}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            >
              Transaksi Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}