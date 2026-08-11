import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-black text-indigo-600 tracking-wider">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-800">Halaman Tidak Ditemukan</h2>
        <p className="mt-2 text-sm text-slate-600">
          Maaf, halaman yang Anda cari tidak ada atau Anda tidak memiliki akses untuk membukanya.
        </p>
        <div className="mt-6">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            {isAuthenticated ? "Kembali ke Dashboard" : "Ke Halaman Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;