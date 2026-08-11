import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
        <p className="text-xl font-bold text-slate-800 mt-4">Halaman Tidak Ditemukan</p>
        <p className="text-slate-500 mt-2 text-sm">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;