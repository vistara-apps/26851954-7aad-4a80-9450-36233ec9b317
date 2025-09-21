'use client';

import { Lightbulb, TrendingUp, Users, Target } from 'lucide-react';

interface NicheSuggestionProps {
  title: string;
  description: string;
  marketSize?: string;
  competition?: 'low' | 'medium' | 'high';
  opportunity?: string;
  variant?: 'highlighted' | 'default';
  onClick?: () => void;
}

export function NicheSuggestion({
  title,
  description,
  marketSize,
  competition = 'medium',
  opportunity,
  variant = 'default',
  onClick
}: NicheSuggestionProps) {
  const competitionColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100'
  };

  const isHighlighted = variant === 'highlighted';

  return (
    <div 
      className={`
        card cursor-pointer transition-all duration-200 hover:shadow-lg
        ${isHighlighted ? 'ring-2 ring-accent bg-accent/5' : ''}
      `}
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`
              p-2 rounded-md flex-shrink-0
              ${isHighlighted ? 'bg-accent text-white' : 'bg-primary/10 text-primary'}
            `}>
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {marketSize && (
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-muted" />
              <div>
                <div className="text-xs text-muted">Market Size</div>
                <div className="text-sm font-medium text-gray-900">{marketSize}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted" />
            <div>
              <div className="text-xs text-muted">Competition</div>
              <div className={`
                text-xs font-medium px-2 py-1 rounded-full
                ${competitionColors[competition]}
              `}>
                {competition.charAt(0).toUpperCase() + competition.slice(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Opportunity */}
        {opportunity && (
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <Target className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Key Opportunity
                </h4>
                <p className="text-sm text-gray-700">{opportunity}</p>
              </div>
            </div>
          </div>
        )}

        {/* Highlighted indicator */}
        {isHighlighted && (
          <div className="flex items-center justify-center pt-2">
            <div className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              ⭐ Recommended Opportunity
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
