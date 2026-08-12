import { useState, useEffect } from 'react';

const initialFormState = {
  name: '',
  code: '',
  category: 'Makanan',
  price: '',
  stock: '',
  image: ''
};

export function useProductForm(initialValues = null, onSubmit = null) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        code: initialValues.code || '',
        category: initialValues.category || 'Makanan',
        price: initialValues.price !== undefined ? String(initialValues.price) : '',
        stock: initialValues.stock !== undefined ? String(initialValues.stock) : '',
        image: initialValues.image || ''
      });
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama produk wajib diisi';
    if (!formData.code.trim()) newErrors.code = 'Kode produk wajib diisi';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Harga harus lebih dari 0';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'Stok tidak boleh negatif';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (validate()) {
      if (onSubmit) {
        onSubmit(formData);
      }
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData
  };
}
