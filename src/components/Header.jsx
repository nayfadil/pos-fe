import React from 'react';
import { Store, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-tight">POS System</h1>
              <p className="text-xs text-gray-500">Kasir & Manajemen Stok</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <nav className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('pos')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'pos'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Kasir (POS)</span>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === 'admin'
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                )}
              </nav>
            )}

            {user && (
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="font-semibold text-xs leading-tight">{user.name}</p>
                    <p className="text-[10px] text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Keluar"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
