import React from 'react';
import ProductForm from '../components/admin/ProductForm';

export function AdminDashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}