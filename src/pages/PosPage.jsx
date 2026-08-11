import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/pos/ProductGrid';
import { CartSidebar } from '../components/pos/CartSidebar';

export const PosPage = () => {
  const { user } = useContext(AuthContext);
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useProducts();

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-sm">
            P
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">POS System</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">{user?.name}</p>
            <p className="text-[10px] text-slate-400">{user?.role} • Shift {user?.shift}</p>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-4 overflow-hidden">
        <section className="flex-1 h-full overflow-hidden">
          <ProductGrid
            products={products}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>
        <aside className="h-full flex-shrink-0">
          <CartSidebar />
        </aside>
      </main>
    </div>
  );
};