import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pos_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pos_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pos_user');
    }
  }, [user]);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      const userData = { id: 1, name: 'Admin Manager', username: 'admin', role: 'admin' };
      setUser(userData);
      return { success: true };
    } else if (username === 'kasir' && password === 'kasir123') {
      const userData = { id: 2, name: 'Kasir Utama', username: 'kasir', role: 'cashier' };
      setUser(userData);
      return { success: true };
    }
    return { success: false, message: 'Username atau password salah' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}