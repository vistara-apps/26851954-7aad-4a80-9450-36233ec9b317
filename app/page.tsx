'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { AnalysisCard } from '@/components/AnalysisCard';
import { NicheSuggestion } from '@/components/NicheSuggestion';
import { ProjectAnalysis, AnalysisRequest } from '@/lib/types';
import { isValidUrl } from '@/lib/utils';
import { Search, Zap, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [projectUrl, setProjectUrl] = useState('');
  const [projectName, setProjectName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyses, setAnalyses] = useState<ProjectAnalysis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!projectUrl.trim()) {
      setError('Please enter a project URL');
      return;
    }

    if (!isValidUrl(projectUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const request: AnalysisRequest = {
        projectUrl: projectUrl.trim(),
        projectName: projectName.trim() || undefined,
      };

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const result = await response.json();

      if (result.success) {
        setAnalyses(prev => [result.data, ...prev]);
        setProjectUrl('');
        setProjectName('');
      } else {
        setError(result.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to analyze project. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleViewDetails = (analysis: ProjectAnalysis) => {
    // In a real app, this would navigate to a detailed view
    console.log('View details for:', analysis);
  };

  const handleRunTest = (analysis: ProjectAnalysis) => {
    // In a real app, this would open the frame generator
    console.log('Run test for:', analysis);
  };

  const sampleNiches = [
    {
      title: 'Mobile-First DeFi',
      description: 'Most DeFi protocols lack proper mobile optimization, creating opportunities for mobile-native versions.',
      marketSize: '$2.1B',
      competition: 'low' as const,
      opportunity: 'Build mobile-optimized versions of popular DeFi protocols with simplified UX',
    },
    {
      title: 'Social NFT Platforms',
      description: 'NFT marketplaces focus on trading but lack social features for community building.',
      marketSize: '$890M',
      competition: 'medium' as const,
      opportunity: 'Add social layers to existing NFT platforms with creator tools and community features',
    },
    {
      title: 'Micro-Gaming Economy',
      description: 'Gaming projects target large audiences but miss opportunities in niche gaming communities.',
      marketSize: '$450M',
      competition: 'low' as const,
      opportunity: 'Create specialized gaming platforms for underserved gaming niches',
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Ethically forge your next big thing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build on the shoulders of giants by identifying opportunities to ethically fork 
            existing projects and create differentiated MiniApps on Base.
          </p>
        </div>

        {/* Analysis Input */}
        <div className="card max-w-2xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Analyze a Project
            </h2>
            <p className="text-sm text-gray-600">
              Enter a Base project URL to discover forking opportunities and ethical considerations.
            </p>
            
            <div className="space-y-3">
              <div>
                <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL *
                </label>
                <input
                  id="projectUrl"
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://example-project.com"
                  className="input"
                  disabled={isAnalyzing}
                />
              </div>
              
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name (optional)
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Uniswap, OpenSea"
                  className="input"
                  disabled={isAnalyzing}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !projectUrl.trim()}
              className="btn-primary w-full"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Analyze Project</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Recent Analyses */}
        {analyses.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recent Analyses</h2>
              <span className="text-sm text-muted">{analyses.length} analysis{analyses.length !== 1 ? 'es' : ''}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyses.map((analysis) => (
                <AnalysisCard
                  key={analysis.analysisId}
                  analysis={analysis}
                  onViewDetails={handleViewDetails}
                  onRunTest={handleRunTest}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sample Niches */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Trending Opportunities</h2>
            <p className="text-gray-600">
              Discover underserved niches in the Base ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleNiches.map((niche, index) => (
              <NicheSuggestion
                key={index}
                title={niche.title}
                description={niche.description}
                marketSize={niche.marketSize}
                competition={niche.competition}
                opportunity={niche.opportunity}
                variant={index === 0 ? 'highlighted' : 'default'}
                onClick={() => console.log('Explore niche:', niche.title)}
              />
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-surface rounded-lg p-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">How ForkMaster Works</h2>
            <p className="text-gray-600">
              Four powerful tools to help you build ethically and successfully
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900">Niche Finder</h3>
              <p className="text-sm text-gray-600">
                Identify underserved market segments and opportunities
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-gray-900">Ethical Framework</h3>
              <p className="text-sm text-gray-600">
                Ensure legal compliance and ethical forking practices
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Feature Generator</h3>
              <p className="text-sm text-gray-600">
                Get AI-powered suggestions for value-adding features
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Market Testing</h3>
              <p className="text-sm text-gray-600">
                Validate ideas with Farcaster frames before building
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to build your next big thing?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Start by analyzing an existing project to discover your unique opportunity.
          </p>
          <button
            onClick={() => document.getElementById('projectUrl')?.focus()}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
