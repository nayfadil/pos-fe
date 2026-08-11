import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Store } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Kasir Pintar POS</h1>
            <p className="text-xs text-indigo-200">Sistem Penjualan Toko</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-indigo-700/50 px-3 py-1.5 rounded-full border border-indigo-500/30">
              <User className="w-4 h-4 text-indigo-200" />
              <div className="text-xs">
                <span className="font-medium block text-white">{user.name}</span>
                <span className="text-indigo-200 text-[10px] uppercase font-bold tracking-wider">{user.role}</span>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center space-x-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200 shadow-sm border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-indigo-600"
              title="Keluar dari sistem"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}