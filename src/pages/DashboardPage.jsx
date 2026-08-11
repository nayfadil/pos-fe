import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Halo, {user?.name}! 👋
          </h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Selamat datang kembali di Dashboard. Anda login sebagai <span className="font-semibold text-indigo-600">{user?.role}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Status Sesi</p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">Aktif</p>
            <p className="text-xs text-slate-500 mt-1">Otentikasi berhasil terverifikasi</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Akses Sistem</p>
            <p className="text-2xl font-bold text-indigo-600 mt-2">Penuh</p>
            <p className="text-xs text-slate-500 mt-1">Siap menambahkan fitur lanjutan</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Versi Routing</p>
            <p className="text-2xl font-bold text-slate-800 mt-2">v6.0</p>
            <p className="text-xs text-slate-500 mt-1">React Router DOM Configured</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;