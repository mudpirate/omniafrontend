import React, { useState } from 'react';
import { FormData } from '../../types';
import { Button } from '../ui/Button';
import { Check, Loader2, ChevronLeft } from 'lucide-react';

interface Props {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const Step4Legal: React.FC<Props> = ({ data, onUpdate, onSubmit, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // BYPASS VALIDATION FOR PREVIEW
    /*
    if (!data.agreedToTerms) {
      setError("You must agree to the Terms & Conditions to proceed.");
      return;
    }
    */
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Final Review</h2>
        <p className="text-gray-500 mt-2">Review your details and agree to our terms.</p>
        <p className="text-xs text-orange-600 mt-1 font-medium bg-orange-50 inline-block px-2 py-1 rounded">Preview Mode: Validation Disabled</p>
      </div>

      <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm space-y-4">
        <h3 className="font-semibold text-gray-900">Summary</h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Business</span>
                <span className="font-medium">{data.businessName || <span className="text-gray-400 italic">Not provided</span>}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{data.workEmail || <span className="text-gray-400 italic">Not provided</span>}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Serviceable Countries</span>
                <span className="font-medium text-right max-w-[200px]">
                    {data.serviceableCountries.length > 0 
                        ? data.serviceableCountries.join(", ") 
                        : <span className="text-gray-400 italic">None selected</span>
                    }
                </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Website</span>
                <span className="font-medium truncate max-w-[200px]">{data.websiteUrl || <span className="text-gray-400 italic">Not provided</span>}</span>
            </div>
            <div className="flex justify-between pt-1">
                <span className="text-gray-500">Feed</span>
                <span className="font-medium truncate max-w-[200px]">{data.feedUrl || <span className="text-gray-400 italic">Not provided</span>}</span>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={data.agreedToTerms}
              onChange={(e) => {
                onUpdate({ agreedToTerms: e.target.checked });
                if (e.target.checked) setError('');
              }}
            />
            <div className={`w-5 h-5 border transition-colors flex items-center justify-center ${
                data.agreedToTerms ? 'bg-black border-black' : 'bg-white border-gray-300 group-hover:border-black'
            }`}>
               {data.agreedToTerms && <Check size={14} className="text-white" />}
            </div>
          </div>
          <span className="text-sm text-gray-700 pt-0.5 select-none">
            I agree to the <a href="#" className="underline font-medium text-black">Terms & Conditions</a> and <a href="#" className="underline font-medium text-black">Privacy Policy</a>.
          </span>
        </label>
        
        {error && <p className="text-sm text-red-600 font-medium animate-in slide-in-from-top-1">{error}</p>}
      </div>

      <div className="pt-4 flex gap-3">
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
            type="submit" 
            fullWidth 
            disabled={isSubmitting}
            className="h-12 text-base flex-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </div>
    </form>
  );
};