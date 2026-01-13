import React from 'react';
import { FormData } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowRight, ChevronLeft } from 'lucide-react';

interface Props {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export const Step3Promotion: React.FC<Props> = ({ data, onUpdate, onNext, onSkip, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(); // Optional fields, always proceed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Promotion Setup</h2>
        <p className="text-gray-500 mt-2">Attract customers with an initial discount.</p>
        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium uppercase tracking-wider rounded">Optional</span>
      </div>

      <Input
        label="Universal Coupon Code"
        placeholder="e.g. OMNIA15"
        value={data.couponCode}
        onChange={(e) => onUpdate({ couponCode: e.target.value })}
      />

      <Input
        label="Discount Description"
        placeholder="e.g. Get 15% off everything"
        value={data.discountDesc}
        onChange={(e) => onUpdate({ discountDesc: e.target.value })}
      />

      <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> You can skip this and add coupons later from your dashboard.
        </p>
      </div>

      <div className="pt-8 flex gap-3">
        <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            className="px-4"
        >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
        </Button>
        <Button 
            type="button" 
            variant="outline" 
            onClick={onSkip} 
            className="flex-1"
        >
            Skip for now
        </Button>
        <Button type="submit" className="flex-[2] group">
          Save & Continue
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
};