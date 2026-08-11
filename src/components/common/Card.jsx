import React from 'react';

export const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`p-4 border-b border-slate-100 font-semibold text-slate-800 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`p-4 border-t border-slate-100 bg-slate-50/50 ${className}`}>
    {children}
  </div>
);