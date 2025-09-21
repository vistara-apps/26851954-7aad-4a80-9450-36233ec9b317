'use client';

import { ProjectAnalysis } from '@/lib/types';
import { formatDate, truncateText } from '@/lib/utils';
import { PRIORITY_LEVELS, SEVERITY_LEVELS } from '@/lib/constants';
import { ExternalLink, Clock, AlertTriangle, Lightbulb, TestTube } from 'lucide-react';

interface AnalysisCardProps {
  analysis?: ProjectAnalysis;
  variant?: 'default' | 'loading';
  onViewDetails?: (analysis: ProjectAnalysis) => void;
  onRunTest?: (analysis: ProjectAnalysis) => void;
}

export function AnalysisCard({ 
  analysis, 
  variant = 'default',
  onViewDetails,
  onRunTest 
}: AnalysisCardProps) {
  if (variant === 'loading') {
    return (
      <div className="card animate-pulse">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const highPriorityFeatures = analysis.suggestedFeatures.filter(f => f.priority === 'high').length;
  const highRiskConsiderations = analysis.ethicalConsiderations.filter(c => c.severity === 'high').length;

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {analysis.projectName}
            </h3>
            <div className="flex items-center text-sm text-muted space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>{truncateText(analysis.projectUrl, 40)}</span>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(analysis.createdAt)}
          </div>
        </div>

        {/* Niche Opportunity */}
        <div className="bg-accent/10 rounded-md p-3">
          <div className="flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Identified Niche</h4>
              <p className="text-sm text-gray-700">
                {truncateText(analysis.identifiedNiche, 120)}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-semibold text-gray-900">
              {analysis.suggestedFeatures.length}
            </div>
            <div className="text-xs text-muted">Features</div>
            {highPriorityFeatures > 0 && (
              <div className="text-xs text-red-600">
                {highPriorityFeatures} high priority
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-gray-900">
              {analysis.ethicalConsiderations.length}
            </div>
            <div className="text-xs text-muted">Ethical Items</div>
            {highRiskConsiderations > 0 && (
              <div className="text-xs text-red-600 flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {highRiskConsiderations} high risk
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-gray-900">
              {analysis.differentiationTests.length}
            </div>
            <div className="text-xs text-muted">Tests Ready</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={() => onViewDetails?.(analysis)}
            className="btn-primary flex-1"
          >
            View Analysis
          </button>
          {analysis.differentiationTests.length > 0 && (
            <button
              onClick={() => onRunTest?.(analysis)}
              className="btn-outline flex items-center space-x-1"
            >
              <TestTube className="w-4 h-4" />
              <span>Test</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
