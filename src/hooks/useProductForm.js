import { useState, useEffect } from 'react';

export function useProductForm(initialData = null, onSubmitCallback) {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    price: '',
    category: 'Makanan',
    stock: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || '',
        name: initialData.name || '',
        price: initialData.price || '',
        category: initialData.category || 'Makanan',
        stock: initialData.stock || '',
        image: initialData.image || ''
      });
    } else {
      setFormData({
        code: `PRD-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        price: '',
        category: 'Makanan',
        stock: '',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama produk wajib diisi';
    if (!formData.code.trim()) newErrors.code = 'Kode produk wajib diisi';
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = 'Harga harus lebih besar dari 0';
    if (formData.stock === '' || Number(formData.stock) < 0)
      newErrors.stock = 'Stok tidak boleh negatif';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmitCallback) {
        onSubmitCallback(formData);
      }
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData
  };
}