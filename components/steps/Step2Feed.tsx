import React, { useState } from 'react';
import { FormData } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { HelpCircle, ArrowRight, FileSpreadsheet, ShoppingBag, Link as LinkIcon, ChevronLeft } from 'lucide-react';

interface Props {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Feed: React.FC<Props> = ({ data, onUpdate, onNext, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!data.feedUrl) {
      setError("Product feed URL is required");
      return false;
    }
    if (!/^https?:\/\/.+/.test(data.feedUrl)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // BYPASS VALIDATION FOR PREVIEW
    onNext();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Connect Your Inventory</h2>
          <p className="text-gray-500 mt-2">Link your live product feed to automatically sync items.</p>
          <p className="text-xs text-orange-600 mt-1 font-medium bg-orange-50 inline-block px-2 py-1 rounded">Preview Mode: Validation Disabled</p>
        </div>

        <div>
          <Input
            label="Product Feed URL"
            placeholder="https://..."
            value={data.feedUrl}
            onChange={(e) => onUpdate({ feedUrl: e.target.value })}
            required={false}
            error={error}
          />
          
          <div className="flex justify-between items-start mt-2">
            <p className="text-sm text-gray-500 max-w-xs">
              Paste the link to your live product inventory. We support Google Sheets (CSV), XML, or direct CSV links.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-black hover:underline flex items-center shrink-0"
            >
              <HelpCircle size={16} className="mr-1.5" />
              How do I get this link?
            </button>
          </div>
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
          <Button type="submit" fullWidth className="group flex-1">
            Continue
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="How to create a Live Feed URL"
      >
        <div className="space-y-8">
          <section>
            <div className="flex items-center mb-3">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Option A: Google Sheets (Easiest)</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm ml-2">
              <li>Organize your products with these headers: <span className="font-mono bg-gray-100 px-1">Title</span>, <span className="font-mono bg-gray-100 px-1">Price</span>, <span className="font-mono bg-gray-100 px-1">Image URL</span>, <span className="font-mono bg-gray-100 px-1">Link</span>, <span className="font-mono bg-gray-100 px-1">Brand</span>, <span className="font-mono bg-gray-100 px-1">Category</span>.</li>
              <li>Click <strong>File &gt; Share &gt; Publish to Web</strong>.</li>
              <li>Change "Web Page" to <strong>Comma-separated values (.csv)</strong>.</li>
              <li>Copy the link and paste it here.</li>
            </ol>
            <p className="mt-2 text-xs text-gray-500 italic ml-2">Tip: When you update the sheet, Omnia updates automatically.</p>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Option B: Shopify / WooCommerce</h3>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm ml-2">
              <li>Install a free "Google Shopping Feed" app/plugin.</li>
              <li>Go to the app settings and find the <strong>XML or CSV Feed URL</strong>.</li>
              <li>Copy that URL and paste it here.</li>
            </ol>
          </section>

          <section>
            <div className="flex items-center mb-3">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">Option C: Direct CSV</h3>
            </div>
            <p className="text-gray-600 text-sm ml-2">
              If your IT team generates a daily inventory file, paste the direct public link (e.g., <span className="font-mono bg-gray-100 px-1">https://mystore.com/feeds/daily_stock.csv</span>).
            </p>
          </section>
        </div>
      </Modal>
    </>
  );
};