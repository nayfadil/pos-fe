import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';

export function CartSidebar({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout
}) {
  const [cash, setCash] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const numCash = Number(cash) || 0;
  const change = numCash - totalAmount;

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (numCash < totalAmount) return;

    onCheckout(cartItems);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCash('');
      onClearCart();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[calc(100vh-100px)] sticky top-20">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-gray-800">Keranjang Belanja</h2>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
          >
            Kosongkan
          </button>
        )}
      </div>

      {checkoutSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-gray-800">Transaksi Berhasil!</h3>
          <p className="text-sm text-gray-500 mt-1">
            Kembalian: Rp {Math.max(0, change).toLocaleString('id-ID')}
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                <ShoppingCart className=