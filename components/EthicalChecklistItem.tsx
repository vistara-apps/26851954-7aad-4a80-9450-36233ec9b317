'use client';

import { EthicalConsideration } from '@/lib/types';
import { SEVERITY_LEVELS } from '@/lib/constants';
import { Check, X, Clock, AlertTriangle, Info, ExternalLink } from 'lucide-react';

interface EthicalChecklistItemProps {
  consideration: EthicalConsideration;
  variant?: 'checked' | 'unchecked';
  onToggle?: (id: string) => void;
  onViewDetails?: (consideration: EthicalConsideration) => void;
}

export function EthicalChecklistItem({
  consideration,
  variant,
  onToggle,
  onViewDetails
}: EthicalChecklistItemProps) {
  const isChecked = variant === 'checked' || consideration.status === 'approved';
  const severityConfig = SEVERITY_LEVELS[consideration.severity];

  const getStatusIcon = () => {
    switch (consideration.status) {
      case 'approved':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'reviewed':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return <X className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`
      card transition-all duration-200 hover:shadow-md
      ${isChecked ? 'bg-green-50 border-green-200' : ''}
      ${consideration.severity === 'high' ? 'border-l-4 border-l-red-500' : ''}
    `}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <button
              onClick={() => onToggle?.(consideration.id)}
              className={`
                mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
                ${isChecked 
                  ? 'bg-green-600 border-green-600 text-white' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              {isChecked && <Check className="w-3 h-3" />}
            </button>
            
            <div className="flex-1">
              <h4 className={`
                text-sm font-medium mb-1
                ${isChecked ? 'text-green-800 line-through' : 'text-gray-900'}
              `}>
                {consideration.title}
              </h4>
              <p className={`
                text-sm leading-relaxed
                ${isChecked ? 'text-green-700' : 'text-gray-600'}
              `}>
                {consideration.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {getStatusIcon()}
            <div className={`
              text-xs font-medium px-2 py-1 rounded-full
              ${severityConfig.color} ${severityConfig.bgColor}
            `}>
              {severityConfig.label}
            </div>
          </div>
        </div>

        {/* High severity warning */}
        {consideration.severity === 'high' && !isChecked && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium text-red-800 mb-1">
                  High Risk Item
                </h5>
                <p className="text-xs text-red-700">
                  This item requires careful attention before proceeding with your fork.
                  Consider consulting with legal experts if needed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-xs text-muted">
            Status: <span className="font-medium">{consideration.status}</span>
          </div>
          
          <button
            onClick={() => onViewDetails?.(consideration)}
            className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
          >
            <span>Learn more</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
