import React, { useState } from 'react';
import { LayoutGrid, Plus, PackageCheck, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import { ProductForm } from '../components/admin/ProductForm';
import { useProducts } from '../hooks/useProducts';

export const AdminDashboardPage = ({ onNavigateToPos }) => {
  const { products, addProduct } = useProducts();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const handleProductAdded = (newProduct) => {
    addProduct(newProduct);
    setShowAddForm(false);
    setToastMessage(`Produk "${newProduct.name}" berhasil ditambahkan!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStock = products.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard POS</h1>
          </div>
          <div className="flex items-center space-x-3">
            {onNavigateToPos && (
              <button
                onClick={onNavigateToPos}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition"
              >
                Kembali ke Kasir (POS)
              </button>
            )}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Tambah Produk
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Produk</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <PackageCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stok Barang</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalStock} pcs</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Stok Menipis (&lt;10)</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{lowStockCount} Produk</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Form Collapsible Section */}
        {showAddForm && (
          <div className="transition-all duration-300 ease-in-out">
            <ProductForm
              onAddProduct={handleProductAdded}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Product Listing Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Daftar Inventaris Produk</h2>
              <p className="text-sm text-gray-500">Kelola data produk, harga modal, harga jual, dan stok.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                  <th className="py-3.5 px-6">Produk</th>
                  <th className="py-3.5 px-6">Kategori</th>
                  <th className="py-3.5 px-6 text-right">Harga Beli (Modal)</th>
                  <th className="py-3.5 px-6 text-right">Harga Jual</th>
                  <th className="py-3.5 px-6 text-center">Stok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      Tidak ada produk ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const cost = product.costPrice || 0;
                    const sell = product.price || product.sellingPrice || 0;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/80 transition">
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                            {product.category || 'Umum'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-gray-600 font-mono">
                          {cost > 0 ? `Rp ${cost.toLocaleString('id-ID')}` : '-'}
                        </td>
                        <td className="py-4 px-6 text-right font-semibold text-gray-900 font-mono">
                          Rp {sell.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${product.stock < 10 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                            {product.stock} pcs
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
