import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { Header } from './components/Header';
import { PosPage } from './pages/PosPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';

function MainContent() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('pos');
  const { addToCart } = useCart();
  const {
    products,
    allProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'pos' ? (
          <PosPage
            products={products}
            onAddToCart={addToCart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        ) : isAdmin ? (
          <AdminDashboardPage
            allProducts={allProducts}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
          />
        ) : (
          <div className="bg-white p-8 rounded-xl border text-center text-gray-500">
            Anda tidak memiliki akses ke halaman Admin.
          </div>
        )}
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;