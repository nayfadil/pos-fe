import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DUMMY_USERS = [
  { username: 'kasir', password: '123', name: 'Budi Santoso', role: 'Kasir Utama' },
  { username: 'admin', password: '123', name: 'Siti Rahma', role: 'Administrator' }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('pos_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('pos_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData = {
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('pos_user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, message: 'Username atau password salah!' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('pos_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
}