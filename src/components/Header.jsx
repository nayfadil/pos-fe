import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LayoutDashboard, LogOut, Store, User } from 'lucide-react';
import { Button } from './common/Button';

export function Header({ activeTab, setActiveTab }) {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-tight">SmartPOS System</h1>
              <p className="text-xs text-gray-500">Aplikasi Kasir & Inventori</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'pos'
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Kasir (POS)</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Kelola Produk</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{user?.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {user?.role === 'admin' ? 'Admin' : 'Kasir'}
              </span>
            </div>

            <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-1" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}