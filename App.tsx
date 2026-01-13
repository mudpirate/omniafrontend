import React, { useState } from 'react';
import { Step, FormData, INITIAL_DATA } from './types';
import { Step1Account } from './components/steps/Step1Account';
import { Step2Feed } from './components/steps/Step2Feed';
import { Step3Promotion } from './components/steps/Step3Promotion';
import { Step4Legal } from './components/steps/Step4Legal';
import { MagicLinkVerify } from './components/MagicLinkVerify';
import { SuccessView } from './components/SuccessView';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleBack = () => {
    switch (step) {
      case 'verify':
        setStep(1);
        break;
      case 2:
        // Going back from Step 2 sends user to Step 1 (re-verifying flow implicitly, or we could skip verify)
        // For simplicity and security in real flows, we usually go back to Step 1.
        setStep(1); 
        break;
      case 3:
        setStep(2);
        break;
      case 4:
        setStep(3);
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Account 
            data={formData} 
            onUpdate={updateFormData} 
            onNext={() => setStep('verify')} 
          />
        );
      case 'verify':
        return (
          <MagicLinkVerify 
            email={formData.workEmail} 
            onContinue={() => setStep(2)} 
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Step2Feed 
            data={formData} 
            onUpdate={updateFormData} 
            onNext={() => setStep(3)} 
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3Promotion 
            data={formData} 
            onUpdate={updateFormData} 
            onNext={() => setStep(4)}
            onSkip={() => setStep(4)}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4Legal 
            data={formData} 
            onUpdate={updateFormData} 
            onSubmit={() => setStep('success')} 
            onBack={handleBack}
          />
        );
      case 'success':
        return <SuccessView />;
      default:
        return null;
    }
  };

  // Calculate progress excluding the 'verify' and 'success' states visually
  const getProgress = () => {
    if (step === 'success') return 100;
    if (step === 'verify') return 25;
    const current = typeof step === 'number' ? step : 1;
    return ((current - 1) / 4) * 100 + 12.5; // Starts at 12.5% for step 1
  };

  const getStepLabel = () => {
    if (step === 'verify') return 'Verify Email';
    if (step === 'success') return 'Complete';
    return `Step ${step} of 4`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-3xl flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white">
                    <Layout size={18} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Omnia <span className="font-normal text-gray-500">Merchant Portal</span></h1>
            </div>
            {step !== 'success' && (
                <div className="text-sm font-medium text-gray-500">
                    {getStepLabel()}
                </div>
            )}
        </div>
      </header>

      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="w-full h-1 bg-gray-100">
          <div 
            className="h-full bg-black transition-all duration-500 ease-in-out" 
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 max-w-lg py-12">
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-50">
        <p>&copy; {new Date().getFullYear()} Omnia Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;