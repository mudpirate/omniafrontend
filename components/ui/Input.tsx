import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {props.required && <span className="text-black">*</span>}
      </label>
      <input
        className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm rounded-none focus:ring-1 focus:ring-black focus:border-black block transition-colors ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};