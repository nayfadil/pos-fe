import { useState } from "react";
import { Header } from "../components/Header";
import { ProductGrid } from "../components/pos/ProductGrid";
import { CartSidebar } from "../components/pos/CartSidebar";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export function PosPage() {
  const { products, loading } = useProducts();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    totalItems,
  } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = [
    "Semua",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ProductGrid
            products={products}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            onAddToCart={addToCart}
          />
        </div>
        <div className="lg:col-span-1">
          <CartSidebar
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            totalAmount={totalAmount}
            totalItems={totalItems}
          />
        </div>
      </main>
    </div>
  );
}
