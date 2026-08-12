import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProductForm } from '../components/admin/ProductForm';
import { Plus, Edit, Trash2, Package, AlertTriangle, Search } from 'lucide-react';

export function AdminDashboardPage({
  allProducts,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAddSubmit = (data) => {
    onAddProduct(data);
    setIsAdding(false);
  };

  const handleEditSubmit = (data) => {
    onUpdateProduct(editingProduct.id, data);
    setEditingProduct(null);
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockProducts = allProducts.filter((p) => p.stock <= 10);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50/50 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Produk</p>
              <h3 className="text-2xl font-bold text-gray-800">{allProducts.length} Item</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-amber-50/50 border-amber-100">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-white p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Stok Menipis (&le; 10)</p>
              <h3 className="text-2xl font-bold text-gray-800">{lowStockProducts.length} Item</h3>
            </div>
          </div>
        </Card>

        <Card className="bg-emerald-50/50 border-emerald-100">
          <div className="flex items-center justify-between h-full">
            <div>
              <p className="text-xs text-gray-500 font-medium">Manajemen Produk</p>
              <p className="text-xs text-gray-600 mt-1">Tambah / edit data inventori</p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setEditingProduct(null);
                setIsAdding(true);
              }}
            >
              <Plus className="w-4 h-4 mr-1" />
              Tambah Produk
            </Button>
          </div>
        </Card>
      </div>

      {(isAdding || editingProduct) && (
        <Card title={editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}>
          <ProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit}
            onCancel={() => {
              setIsAdding(false);
              setEditingProduct(null);
            }}
          />
        </Card>
      )}

      <Card
        title="Daftar Inventori Produk"
        headerAction={
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama, kode, kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4">Stok</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900 flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover bg-gray-100"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80';
                      }}
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-gray-600">{product.code}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded ${
                        product.stock <= 5
                          ? 'bg-red-100 text-red-700'
                          : product.stock <= 10
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsAdding(false);
                          setEditingProduct(product);
                        }}
                      >
                        <Edit className="w-3.5 h-3.5 text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    Data produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}