import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Proyek', value: '12 Active', change: '+12%', color: 'text-emerald-600' },
    { label: 'Tugas Selesai', value: '84/100', change: '+5%', color: 'text-indigo-600' },
    { label: 'Sistem Status', value: '99.9%', change: 'Optimal', color: 'text-blue-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold">Selamat Datang Kembali, {user?.name}! 👋</h1>
        <p className="mt-2 text-indigo-100 max-w-xl text-sm sm:text-base">
          Anda berhasil login ke sistem. Berikut adalah ringkasan performa dan aktivitas proyek terbaru Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <p className="text-2xl font-extrabold text-slate-900">{item.value}</p>
              <span className={`text-xs font-semibold ${item.color}`}>{item.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;