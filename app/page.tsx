'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { AnalysisCard } from '../components/AnalysisCard';
import { FrameGenerator } from '../components/FrameGenerator';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search, Sparkles } from 'lucide-react';

interface AnalysisResult {
  niche: string;
  ethicalConsiderations: string[];
  features: string[];
  tests: string[];
}

export default function Home() {
  const [projectUrl, setProjectUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [showFrameGenerator, setShowFrameGenerator] = useState(false);

  const handleAnalyze = async () => {
    if (!projectUrl.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowFrameGenerator(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectUrl }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
      // In a real app, you'd show an error message to the user
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateFrame = async (prompt: string) => {
    try {
      const response = await fetch('/api/frame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisData: {
            tests: [prompt],
            analysisId: `analysis_${Date.now()}`
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Frame generation failed');
      }

      const frameData = await response.json();
      console.log('Frame generated:', frameData);
      // In a real app, you'd redirect to the frame or show a success message
    } catch (error) {
      console.error('Frame generation error:', error);
    }
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            Discover Your Next Big Idea
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze existing Base projects to identify underserved niches,
            ensure ethical forking practices, and generate value-adding features
            that set your project apart.
          </p>
        </div>

        {/* Analysis Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Project Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter a Base project URL or name (e.g., uniswap, aave)"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleAnalyze}
                disabled={!projectUrl.trim() || isAnalyzing}
                className="px-8"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            <AnalysisCard result={analysisResult} isLoading={isAnalyzing} />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setShowFrameGenerator(!showFrameGenerator)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Create Differentiation Test
              </Button>
            </div>
          </div>
        )}

        {/* Frame Generator */}
        {showFrameGenerator && (
          <div className="space-y-6">
            <FrameGenerator
              variant="input"
              onGenerate={handleGenerateFrame}
            />
            <FrameGenerator variant="preview" />
          </div>
        )}

        {/* Features Overview */}
        {!analysisResult && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Niche Opportunity Finder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover underserved markets and potential improvements in existing Base projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ethical Forking Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Step-by-step guidance for legally and ethically building on existing projects.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Value-Add Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI-powered suggestions for features that genuinely enhance user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
