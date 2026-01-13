export interface FormData {
  // Step 1
  businessName: string;
  workEmail: string;
  password: string;
  websiteUrl: string;
  instagramUrl: string;
  serviceableCountries: string[];
  
  // Step 2
  feedUrl: string;

  // Step 3
  couponCode: string;
  discountDesc: string;

  // Step 4
  agreedToTerms: boolean;
}

export type Step = 1 | 'verify' | 2 | 3 | 4 | 'success';

export const INITIAL_DATA: FormData = {
  businessName: '',
  workEmail: '',
  password: '',
  websiteUrl: '',
  instagramUrl: '',
  serviceableCountries: [],
  feedUrl: '',
  couponCode: '',
  discountDesc: '',
  agreedToTerms: false,
};