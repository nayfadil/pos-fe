import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'u1',
    name: 'Budi Cashier',
    role: 'Head Cashier',
    shift: 'Morning'
  });

  const logout = () => setUser(null);
  const login = (userData) => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};