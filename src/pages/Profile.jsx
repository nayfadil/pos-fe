import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12 mb-6 sm:space-x-5">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.role}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">Email</label>
              <p className="mt-1 text-sm font-medium text-slate-800">{user?.email}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">User ID</label>
              <p className="mt-1 text-sm font-medium text-slate-800">{user?.id}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase">Status Akun</label>
              <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;