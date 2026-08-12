import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import { PosPage } from './pages/PosPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppContent() {
  const auth = useAuth() || {};
  const { user, activeTab, currentPage } = auth;
  const currentView = activeTab || currentPage;

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 flex overflow-hidden">
        {currentView === 'admin' || currentView === 'dashboard' ? (
          <AdminDashboardPage />
        ) : (
          <PosPage />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}