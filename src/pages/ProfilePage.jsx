import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="h-32 bg-indigo-600"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-12 mb-6">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-2xl ring-4 ring-white object-cover shadow-md bg-white"
              />
              <div className="mt-4 sm:mt-0">
                <h1 className="text-xl font-bold text-slate-800">{user?.name}</h1>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Peran</label>
                <p className="text-sm font-medium text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{user?.role}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ID Pengguna</label>
                <p className="text-sm font-medium text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;