import { useState } from 'react';

export function useProductForm(initialData = {}) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    category: initialData.category || 'Makanan',
    stock: initialData.stock || '',
    image: initialData.image || '📦',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Makanan',
      stock: '',
      image: '📦',
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
}