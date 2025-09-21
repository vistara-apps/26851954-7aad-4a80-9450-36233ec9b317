export interface User {
  userId: string;
  farcasterId?: string;
  subscriptionLevel: 'free' | 'premium';
  credits: number;
}

export interface ProjectAnalysis {
  analysisId: string;
  projectName: string;
  projectUrl: string;
  identifiedNiche: string;
  ethicalConsiderations: EthicalConsideration[];
  suggestedFeatures: Feature[];
  differentiationTests: DifferentiationTest[];
  createdAt: Date;
}

export interface EthicalConsideration {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'reviewed' | 'approved';
  severity: 'low' | 'medium' | 'high';
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedEffort: string;
  valueProposition: string;
}

export interface DifferentiationTest {
  id: string;
  question: string;
  options: string[];
  frameUrl?: string;
  responses?: TestResponse[];
}

export interface TestResponse {
  option: string;
  count: number;
  percentage: number;
}

export interface FarcasterFrame {
  frameId: string;
  prompt: string;
  options: string[];
  createdAt: Date;
}

export interface AnalysisRequest {
  projectUrl: string;
  projectName?: string;
  focusAreas?: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
