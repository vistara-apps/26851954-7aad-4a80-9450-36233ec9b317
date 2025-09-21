export const APP_CONFIG = {
  name: 'ForkMaster',
  tagline: 'Ethically forge your next big thing by building on the shoulders of giants.',
  version: '1.0.0',
  supportEmail: 'support@forkmaster.app',
} as const;

export const SUBSCRIPTION_LEVELS = {
  free: {
    name: 'Free',
    credits: 3,
    price: 0,
    features: ['3 project analyses', 'Basic ethical framework', 'Community support'],
  },
  premium: {
    name: 'Premium',
    credits: -1, // unlimited
    price: 10,
    features: ['Unlimited analyses', 'Advanced AI insights', 'Priority support', 'Frame generation'],
  },
} as const;

export const ANALYSIS_PRICING = {
  perAnalysis: 1, // $1 per analysis
  currency: 'USD',
} as const;

export const ETHICAL_CATEGORIES = [
  'Licensing Compliance',
  'Attribution Requirements',
  'Patent Considerations',
  'Trademark Issues',
  'Community Guidelines',
  'Fair Use Assessment',
] as const;

export const PRIORITY_LEVELS = {
  low: { label: 'Low', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  medium: { label: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  high: { label: 'High', color: 'text-red-600', bgColor: 'bg-red-100' },
} as const;

export const SEVERITY_LEVELS = {
  low: { label: 'Low Risk', color: 'text-green-600', bgColor: 'bg-green-100' },
  medium: { label: 'Medium Risk', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  high: { label: 'High Risk', color: 'text-red-600', bgColor: 'bg-red-100' },
} as const;

export const PROJECT_CATEGORIES = [
  'DeFi',
  'NFT',
  'Gaming',
  'Social',
  'Infrastructure',
  'Tools',
  'Analytics',
  'Governance',
] as const;

export const BASE_CHAIN_ID = 8453;

export const API_ENDPOINTS = {
  analyze: '/api/analyze',
  frames: '/api/frames',
  user: '/api/user',
  projects: '/api/projects',
} as const;
