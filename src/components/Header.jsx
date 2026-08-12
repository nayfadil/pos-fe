import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Store, LayoutDashboard, LogOut, User } from 'lucide-react';

export function Header({ currentView, setCurrentView }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Posify System</h1>
            <p className="text-xs text-slate-400">Aplikasi Kasir & Manajemen Toko</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            {user.role === 'admin' && currentView && setCurrentView && (
              <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                <button
                  onClick={() => setCurrentView('pos')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'pos'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Point of Sale</span>
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'admin'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard Admin</span>
                </button>
              </div>
            )}

            <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-semibold">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium leading-none text-slate-200">{user.name || user.username || 'Pengguna'}</p>
                  <p className="text-xs text-slate-400 capitalize mt-0.5">{user.role || 'Staff'}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Keluar"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}