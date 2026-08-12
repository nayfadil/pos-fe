import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  loading,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  onAddToCart,
}) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500 text-sm">Memuat produk...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl border border-gray-100 text-center p-6">
          <p className="text-gray-500 text-base font-medium">Produk tidak ditemukan</p>
          <p className="text-gray-400 text-sm mt-1">Coba kata kunci atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
