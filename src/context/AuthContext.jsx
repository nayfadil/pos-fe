import React, { createContext, useState, useEffect } from 'react';
import { DUMMY_USERS } from '../constants/mockData';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pos_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored user:', e);
    }
    return null;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('pos_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('pos_user');
      }
    } catch (e) {
      console.error('Error saving user:', e);
    }
  }, [user]);

  const login = (username, password) => {
    const foundUser = DUMMY_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userInfo } = foundUser;
      setUser(userInfo);
      return { success: true, user: userInfo };
    }

    return { success: false, error: 'Username atau password salah' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}