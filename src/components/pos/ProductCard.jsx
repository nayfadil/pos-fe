import { Plus } from "lucide-react";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

export function ProductCard({ product, onAddToCart }) {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Card className="flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 space-y-2">
        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-2">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs font-semibold">{product.category || "Produk"}</span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">{product.name}</h3>
        <p className="text-xs text-gray-500">Stok: {product.stock}</p>
        <p className="font-bold text-blue-600 text-sm">{formatRupiah(product.price)}</p>
      </div>
      <div className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          className="w-full flex items-center justify-center gap-1 text-xs py-2"
        >
          <Plus className="w-4 h-4" />
          {product.stock > 0 ? "Tambah" : "Habis"}
        </Button>
      </div>
    </Card>
  );
}
