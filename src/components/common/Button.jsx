import React from 'react';

const VARIANTS = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500',
  secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-400',
  danger: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-400',
  outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-indigo-500',
  ghost: 'text-slate-600 hover:bg-slate-100 focus:ring-slate-400'
};

const SIZES = {
  sm: 'px-2.5 py-1.5 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-semibold',
  lg: 'px-5 py-2.5 text-base font-semibold'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;
  const sizeStyles = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};