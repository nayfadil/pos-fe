import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, ShoppingBag, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan Password tidak boleh kosong!');
      return;
    }

    const res = login(username, password);
    if (!res.success) {
      setError(res.message);
    }
  };

  const fillCredential = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-500/30">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Selamat Datang Kembali</h2>
            <p className="text-slate-400 text-sm mt-1">Masuk ke akun kasir Anda untuk memulai transaksi</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3.5 flex items-center gap-3 text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer mt-2"
            >
              Masuk Sistem
            </button>
          </form>
        </div>

        <div className="bg-slate-900/60 p-5 border-t border-slate-700/50 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold text-indigo-400 mb-2">
            <KeyRound className="w-4 h-4" />
            <span>Kredensial Pengujian (Demo):</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              type="button"
              onClick={() => fillCredential('kasir', '123')}
              className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors group cursor-pointer"
            >
              <span className="block text-slate-300 font-medium group-hover:text-indigo-300">Kasir</span>
              <span className="block text-[11px] text-slate-500">User: kasir | Pass: 123</span>
            </button>
            <button
              type="button"
              onClick={() => fillCredential('admin', '123')}
              className="text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors group cursor-pointer"
            >
              <span className="block text-slate-300 font-medium group-hover:text-indigo-300">Admin</span>
              <span className="block text-[11px] text-slate-500">User: admin | Pass: 123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}