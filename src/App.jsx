import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PosPage } from './pages/PosPage';

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PosPage />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;