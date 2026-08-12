import React from 'react';
import { Header } from '../components/Header';
import { ProductForm } from '../components/admin/ProductForm';

export function AdminDashboardPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentPage="admin" onNavigate={onNavigate} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-600">Kelola produk dan inventaris toko Anda.</p>
        </div>
        <ProductForm />
      </main>
    </div>
  );
}