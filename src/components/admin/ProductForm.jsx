import React from 'react';
import { Package, DollarSign, Layers, PlusCircle, AlertCircle, Tag, CheckCircle2 } from 'lucide-react';
import { useProductForm } from '../../hooks/useProductForm';

export const ProductForm = ({ onAddProduct, onCancel }) => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  } = useProductForm(onAddProduct);

  const calculateProfit = () => {
    const cost = Number(values.costPrice);
    const selling = Number(values.sellingPrice);
    if (cost > 0 && selling >= cost) {
      const margin = selling - cost;
      const percentage = ((margin / cost) * 100).toFixed(1);
      return { margin, percentage };
    }
    return null;
  };

  const profit = calculateProfit();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlusCircle className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Tambah Produk Baru</h3>
        </div>
        <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium text-white/90">
          Admin Panel
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Nama Produk */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Produk <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Package className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Contoh: Kopi Susu Gula Aren"
              className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>

        {/* Grid Harga Beli & Harga Jual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Harga Beli */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Harga Beli (Cost Price) <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-semibold text-xs">
                Rp
              </div>
              <input
                type="number"
                name="costPrice"
                value={values.costPrice}
                onChange={handleChange}
                placeholder="15000"
                className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${errors.costPrice ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
              />
            </div>
            {errors.costPrice && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.costPrice}
              </p>
            )}
          </div>

          {/* Harga Jual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Harga Jual (Selling Price) <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-semibold text-xs">
                Rp
              </div>
              <input
                type="number"
                name="sellingPrice"
                value={values.sellingPrice}
                onChange={handleChange}
                placeholder="22000"
                className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${errors.sellingPrice ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
              />
            </div>
            {errors.sellingPrice && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.sellingPrice}
              </p>
            )}
          </div>
        </div>

        {/* Preview Profit Indicator */}
        {profit && !errors.sellingPrice && !errors.costPrice && (
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-xs flex justify-between items-center">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Margin Keuntungan Estimasi:
            </span>
            <span className="font-bold">
              Rp {profit.margin.toLocaleString('id-ID')} ({profit.percentage}%)
            </span>
          </div>
        )}

        {/* Grid Stok & Kategori */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stok */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Stok Awal <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Layers className="w-4 h-4" />
              </div>
              <input
                type="number"
                name="stock"
                value={values.stock}
                onChange={handleChange}
                placeholder="50"
                className={`block w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition ${errors.stock ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
              />
            </div>
            {errors.stock && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.stock}
              </p>
            )}
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Kategori
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Tag className="w-4 h-4" />
              </div>
              <select
                name="category"
                value={values.category}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="Minuman">Minuman</option>
                <option value="Makanan">Makanan</option>
                <option value="Snack">Snack</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onCancel) onCancel();
            }}
            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
};
