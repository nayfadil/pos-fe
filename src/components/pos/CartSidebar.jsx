import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "../common/Button";

export function CartSidebar({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  totalAmount,
  totalItems,
}) {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-7rem)] sticky top-20">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-gray-800">Keranjang ({totalItems})</h2>
        </div>
        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Kosongkan
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
            <ShoppingBag className="w-12 h-12 stroke-1 mb-2" />
            <p className="text-sm font-medium">Keranjang masih kosong</p>
            <p className="text-xs text-gray-400 mt-1">Pilih produk di samping untuk menambah</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm border border-gray-100"
            >
              <div className="flex-1 pr-2">
                <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  {formatRupiah(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-200 rounded-md bg-white">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-l-md"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-xs font-semibold text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-r-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50/50 rounded-b-xl">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Harga</span>
          <span className="font-bold text-gray-900 text-base">{formatRupiah(totalAmount)}</span>
        </div>
        <Button
          disabled={cart.length === 0}
          className="w-full py-2.5 text-sm font-semibold"
          variant="primary"
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
}
