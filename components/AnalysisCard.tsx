import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, Lightbulb, Target, Zap } from 'lucide-react';

interface AnalysisResult {
  niche: string;
  ethicalConsiderations: string[];
  features: string[];
  tests: string[];
}

interface AnalysisCardProps {
  result: AnalysisResult;
  isLoading?: boolean;
}

export function AnalysisCard({ result, isLoading }: AnalysisCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Analyzing Project...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <Target className="h-5 w-5" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Niche Opportunity */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-accent" />
            Identified Niche Opportunity
          </h3>
          <Badge variant="secondary" className="text-sm">
            {result.niche}
          </Badge>
        </div>

        {/* Ethical Considerations */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" />
            Ethical Forking Framework
          </h3>
          <div className="space-y-2">
            {result.ethicalConsiderations.map((consideration, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-surface rounded-md">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{consideration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Value-Add Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            Value-Add Feature Suggestions
          </h3>
          <div className="space-y-2">
            {result.features.map((feature, index) => (
              <div key={index} className="p-3 bg-surface rounded-md">
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiation Tests */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            Rapid Differentiation Tests
          </h3>
          <div className="space-y-2">
            {result.tests.map((test, index) => (
              <div key={index} className="p-3 bg-surface rounded-md">
                <span className="text-sm">{test}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

