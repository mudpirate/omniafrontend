import React, { useState } from 'react';
import { FormData } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ArrowRight, Globe, X } from 'lucide-react';

interface Props {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Holy See", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

export const Step1Account: React.FC<Props> = ({ data, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = () => {
    // Validation logic kept for reference
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!data.businessName) newErrors.businessName = "Business name is required";
    if (!data.workEmail) newErrors.workEmail = "Work email is required";
    
    // Serviceable countries check
    if (!data.serviceableCountries || data.serviceableCountries.length === 0) {
        // We'll just alert for now since error state is mapped to string keys
        // valid in real app to map this to a specific error field
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    if (country && !data.serviceableCountries.includes(country)) {
      onUpdate({ serviceableCountries: [...data.serviceableCountries, country] });
    }
    // Reset select to default
    e.target.value = "";
  };

  const removeCountry = (countryToRemove: string) => {
    onUpdate({
      serviceableCountries: data.serviceableCountries.filter(c => c !== countryToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // BYPASS VALIDATION FOR PREVIEW
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
        <p className="text-gray-500 mt-2">Start your journey with Omnia.</p>
        <p className="text-xs text-orange-600 mt-1 font-medium bg-orange-50 inline-block px-2 py-1 rounded">Preview Mode: Validation Disabled</p>
      </div>

      <Input
        label="Business Name"
        placeholder="e.g. Acme Corp"
        value={data.businessName}
        onChange={(e) => onUpdate({ businessName: e.target.value })}
        required={false}
        error={errors.businessName}
      />

      <Input
        label="Work Email"
        type="email"
        placeholder="you@company.com"
        value={data.workEmail}
        onChange={(e) => onUpdate({ workEmail: e.target.value })}
        required={false}
        error={errors.workEmail}
        helperText="We'll send a verification link immediately."
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={data.password}
        onChange={(e) => onUpdate({ password: e.target.value })}
        required={false}
        error={errors.password}
      />

      <div className="w-full mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Serviceable Countries
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-gray-400" />
            </div>
            <select 
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 text-gray-900 text-sm rounded-none focus:ring-1 focus:ring-black focus:border-black block transition-colors appearance-none"
                onChange={handleCountrySelect}
                defaultValue=""
            >
                <option value="" disabled>Select countries to add...</option>
                {ALL_COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </div>
        
        {/* Selected Countries Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
            {data.serviceableCountries.map(country => (
                <span key={country} className="inline-flex items-center px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                    {country}
                    <button 
                        type="button" 
                        onClick={() => removeCountry(country)}
                        className="ml-2 hover:text-gray-300 focus:outline-none"
                    >
                        <X size={12} />
                    </button>
                </span>
            ))}
        </div>

        <div className="mt-3 p-3 bg-gray-50 border border-gray-100 text-xs text-gray-600 rounded-sm">
            <p className="font-medium mb-1">Important Note:</p>
            <p>Only input countries where you intend to serve. You must have currency details and inventory product feed according to that country.</p>
        </div>
      </div>

      <Input
        label="Website URL"
        type="url"
        placeholder="https://www.example.com"
        value={data.websiteUrl}
        onChange={(e) => onUpdate({ websiteUrl: e.target.value })}
        required={false}
        error={errors.websiteUrl}
      />

      <Input
        label="Instagram Handle"
        placeholder="@yourbrand (Optional)"
        value={data.instagramUrl}
        onChange={(e) => onUpdate({ instagramUrl: e.target.value })}
      />

      <div className="pt-4">
        <Button type="submit" fullWidth className="group">
          Create Account
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </form>
  );
};