import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const SuccessView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 animate-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 border border-green-100">
        <CheckCircle2 size={48} />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Under Review</h2>
      
      <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
        Success! We are reviewing your store. You will receive an email once your products are live on Omnia.
      </p>
      
      <div className="mt-8 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
        Usually within 24 hours
      </div>
    </div>
  );
};