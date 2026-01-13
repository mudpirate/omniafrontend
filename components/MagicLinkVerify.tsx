import React from 'react';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  email: string;
  onContinue: () => void;
  onBack: () => void;
}

export const MagicLinkVerify: React.FC<Props> = ({ email, onContinue, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Mail size={32} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your inbox</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        We sent a magic link to <span className="font-semibold text-black">{email}</span>. 
        Click it to verify your account and continue.
      </p>
      
      {/* Simulation Button */}
      <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50 max-w-sm w-full mb-6">
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Development Mode Simulation</p>
        <Button onClick={onContinue} fullWidth className="group">
          I've clicked the link
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <button 
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-black flex items-center transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Use a different email
      </button>
    </div>
  );
};