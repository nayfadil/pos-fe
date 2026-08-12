import React, { useState } from 'react';
import { PosPage } from './pages/PosPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('pos'); // 'pos' | 'admin' | 'login'
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Quick Navigation Toolbar for Demo */}
      <div className="bg-gray-900 text-white text-xs px-4 py-1.5 flex justify-between items-center">
        <span className="opacity-80">React POS Admin Mode Switcher</span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage('pos')}
            className={`px-2.5 py-0.5 rounded transition ${currentPage === 'pos' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            Halaman POS
          </button>
          <button
            onClick={() => setCurrentPage('admin')}
            className={`px-2.5 py-0.5 rounded transition ${currentPage === 'admin' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            Dashboard Admin (Tambah Produk)
          </button>
          <button
            onClick={() => setCurrentPage('login')}
            className={`px-2.5 py-0.5 rounded transition ${currentPage === 'login' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            Login
          </button>
        </div>
      </div>

      {currentPage === 'pos' && <PosPage />}
      {currentPage === 'admin' && (
        <AdminDashboardPage onNavigateToPos={() => setCurrentPage('pos')} />
      )}
      {currentPage === 'login' && <LoginPage />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
