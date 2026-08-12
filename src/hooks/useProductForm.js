import { useState } from 'react';

export const useProductForm = (onSubmitSuccess) => {
  const initialValues = {
    name: '',
    costPrice: '',
    sellingPrice: '',
    stock: '',
    category: 'Umum'
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value, allValues) => {
    let error = '';
    const cost = Number(name === 'costPrice' ? value : allValues.costPrice);
    const selling = Number(name === 'sellingPrice' ? value : allValues.sellingPrice);

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Nama produk wajib diisi';
        else if (value.trim().length < 3) error = 'Nama produk minimal 3 karakter';
        break;
      case 'costPrice':
        if (value === '' || value === null) error = 'Harga beli wajib diisi';
        else if (isNaN(value) || Number(value) <= 0) error = 'Harga beli harus lebih dari 0';
        break;
      case 'sellingPrice':
        if (value === '' || value === null) error = 'Harga jual wajib diisi';
        else if (isNaN(value) || Number(value) <= 0) error = 'Harga jual harus lebih dari 0';
        else if (cost > 0 && Number(value) < cost) {
          error = 'Harga jual tidak boleh lebih kecil dari harga beli';
        }
        break;
      case 'stock':
        if (value === '' || value === null) error = 'Stok wajib diisi';
        else if (isNaN(value) || Number(value) < 0) error = 'Stok tidak boleh negatif';
        break;
      default:
        break;
    }
    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const err = validateField(key, values[key], values);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // Real-time validation for target field and cross-field check for prices
    const err = validateField(name, value, nextValues);
    let updatedErrors = { ...errors, [name]: err };

    if (name === 'costPrice' || name === 'sellingPrice') {
      const sellingErr = validateField('sellingPrice', nextValues.sellingPrice, nextValues);
      updatedErrors.sellingPrice = sellingErr;
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      setIsSubmitting(true);
      const payload = {
        id: `prod-${Date.now()}`,
        name: values.name.trim(),
        costPrice: Number(values.costPrice),
        price: Number(values.sellingPrice),
        sellingPrice: Number(values.sellingPrice),
        stock: Number(values.stock),
        category: values.category || 'Umum'
      };

      if (onSubmitSuccess) {
        onSubmitSuccess(payload);
      }
      setIsSubmitting(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
};
