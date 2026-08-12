import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LogOut, LayoutDashboard, Store } from 'lucide-react';

export function Header({ currentPage, onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate && onNavigate('pos')}>
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">QuickPOS</h1>
              <p className="text-xs text-gray-500">Sistem Kasir Modern</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
                  {user.name} ({user.role})
                </span>

                {user.role === 'admin' && (
                  <button
                    onClick={() => onNavigate && onNavigate(currentPage === 'admin' ? 'pos' : 'admin')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    {currentPage === 'admin' ? (
                      <>
                        <Store className="h-4 w-4" />
                        <span>Ke POS</span>
                      </>
                    ) : (
                      <>
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}