import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { PosPage } from './pages/PosPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';

function MainLayout() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('pos');

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {currentView === 'admin' && user.role === 'admin' ? (
          <AdminDashboardPage />
        ) : (
          <PosPage />
        )}
      </main>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;