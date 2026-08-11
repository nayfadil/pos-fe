import React, { useState, useEffect } from 'react';
import { 
  Store, 
  Lock, 
  User, 
  Delete, 
  KeyRound, 
  LogIn, 
  Eye, 
  EyeOff, 
  Clock, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function POSLogin() {
  const [loginMode, setLoginMode] = useState<'pin' | 'password'>('pin');
  const [pin, setPin] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedRegister, setSelectedRegister] = useState<string>('Kasir 01 - Utama');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Clock effect for POS terminal
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNumpadClick = (value: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + value);
    }
  };

  const handleNumpadDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleNumpadClear = () => {
    setPin('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMode === 'pin') {
      console.log('Login via PIN:', { pin, selectedRegister });
    } else {
      console.log('Login via Password:', { username, password, selectedRegister });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
        
        {/* Left Side: Branding & Info */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <Store className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">RestoPOS</h1>
                <p className="text-xs text-emerald-400 font-medium tracking-wide uppercase">Point of Sale System</p>
              </div>
            </div>
          </div>

          {/* Real-time Status Widget */}
          <div className="my-8 relative z-10 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-slate-400 border-b border-slate-800/80 pb-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Waktu Sistem</p>
                <p className="text-lg font-semibold text-slate-200">{currentTime || '00:00:00'}</p>
                <p className="text-xs text-slate-400">{currentDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 font-medium">Status Terminal</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-xs font-semibold text-slate-200">Terhubung ke Server Utama</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="relative z-10 text-xs text-slate-500 space-y-1">
            <p>Versi Aplikasi: v2.4.0-release</p>
            <p>&copy; {new Date().getFullYear()} POS System Inc. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Login Form & Keypad */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-slate-900/50">
          <div>
            {/* Top Bar: Register Selector & Mode Switcher */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
              {/* Register Selection */}
              <div className="relative w-full sm:w-auto">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Pilih Terminal / Kasir</label>
                <div className="relative">
                  <select
                    value={selectedRegister}
                    onChange={(e) => setSelectedRegister(e.target.value)}
                    className="w-full sm:w-60 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl px-3.5 py-2.5 pr-8 appearance-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition cursor-pointer font-medium"
                  >
                    <option value="Kasir 01 - Utama">Kasir 01 - Utama</option>
                    <option value="Kasir 02 - Takeaway">Kasir 02 - Takeaway</option>
                    <option value="Kasir 03 - Bar & Live">Kasir 03 - Bar & Live</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Login Mode Toggle */}
              <div className="w-full sm:w-auto self-end">
                <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 flex items-center">
                  <button
                    type="button"
                    onClick={() => setLoginMode('pin')}
                    className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      loginMode === 'pin'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    PIN Cepat
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMode('password')}
                    className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      loginMode === 'password'
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Akun
                  </button>
                </div>
              </div>
            </div>

            {/* Login Input Area */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {loginMode === 'pin' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-white mb-1">Masuk dengan PIN</h2>
                    <p className="text-xs text-slate-400">Masukkan 6 digit angka PIN Kasir Anda</p>
                  </div>

                  {/* PIN Visual Indicators */}
                  <div className="flex justify-center items-center gap-3 my-4">
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                          index < pin.length
                            ? 'bg-emerald-400 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20'
                            : 'border-slate-700 bg-slate-800/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* On-screen Numpad */}
                  <div className="max-w-xs mx-auto grid grid-cols-3 gap-2.5">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleNumpadClick(num)}
                        className="h-13 py-3 bg-slate-800 hover:bg-slate-700/80 active:bg-emerald-600 active:text-white text-slate-100 font-semibold text-xl rounded-xl border border-slate-700/60 transition shadow-sm flex items-center justify-center"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleNumpadClear}
                      className="h-13 py-3 bg-slate-800/40 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs uppercase tracking-wider rounded-xl border border-slate-800 transition flex items-center justify-center"
                    >
                      C
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNumpadClick('0')}
                      className="h-13 py-3 bg-slate-800 hover:bg-slate-700/80 active:bg-emerald-600 active:text-white text-slate-100 font-semibold text-xl rounded-xl border border-slate-700/60 transition shadow-sm flex items-center justify-center"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handleNumpadDelete}
                      className="h-13 py-3 bg-slate-800/40 hover:bg-slate-700/60 text-slate-300 rounded-xl border border-slate-800 transition flex items-center justify-center"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-w-sm mx-auto py-4">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white mb-1">Masuk dengan Akun</h2>
                    <p className="text-xs text-slate-400">Gunakan Username/Email dan Kata Sandi</p>
                  </div>

                  {/* Username Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Username / ID Staf</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Contoh: kasir_budi"
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition placeholder:text-slate-500"
                        required
                      />
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Kata Sandi</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition placeholder:text-slate-500"
                        required
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="max-w-xs sm:max-w-sm mx-auto pt-2">
                <button
                  type="submit"
                  disabled={loginMode === 'pin' ? pin.length < 4 : !username || !password}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition duration-200 active:scale-[0.99]"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Mulai Shift / Masuk</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Help / Footer */}
          <div className="mt-8 text-center">
            <button 
              type="button"
              className="text-xs text-slate-500 hover:text-emerald-400 transition underline underline-offset-4"
              onClick={() => alert('Silakan hubungi Manager Shift atau Admin IT untuk reset PIN/Password.')}
            >
              Lupa PIN atau Password Kasir?
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}