import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('app_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (email && password) {
      const mockUser = {
        id: 'usr-101',
        name: 'Alex Developer',
        email: email,
        role: 'Senior Architect',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      setUser(mockUser);
      localStorage.setItem('app_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, message: 'Email dan password harus diisi' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);