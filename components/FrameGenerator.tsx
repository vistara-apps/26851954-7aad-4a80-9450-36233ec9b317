'use client';

import { useState } from 'react';
import { DifferentiationTest } from '@/lib/types';
import { generateFrameUrl } from '@/lib/utils';
import { Share2, Copy, Eye, Settings } from 'lucide-react';

interface FrameGeneratorProps {
  test: DifferentiationTest;
  variant?: 'input' | 'preview';
  onGenerate?: (test: DifferentiationTest) => void;
  onShare?: (frameUrl: string) => void;
}

export function FrameGenerator({
  test,
  variant = 'input',
  onGenerate,
  onShare
}: FrameGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate frame generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const url = generateFrameUrl(test.id);
      setFrameUrl(url);
      onGenerate?.(test);
    } catch (error) {
      console.error('Failed to generate frame:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (frameUrl) {
      await navigator.clipboard.writeText(frameUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (frameUrl) {
      onShare?.(frameUrl);
    }
  };

  if (variant === 'preview' && frameUrl) {
    return (
      <div className="card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Frame Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="btn-outline text-xs"
                disabled={!frameUrl}
              >
                <Copy className="w-3 h-3 mr-1" />
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                onClick={handleShare}
                className="btn-primary text-xs"
              >
                <Share2 className="w-3 h-3 mr-1" />
                Share
              </button>
            </div>
          </div>

          {/* Frame Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-3">{test.question}</h4>
              <div className="grid grid-cols-1 gap-2">
                {test.options.map((option, index) => (
                  <button
                    key={index}
                    className="btn-outline text-left justify-start"
                    disabled
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-xs text-muted">
            <p>Frame URL: <code className="bg-gray-100 px-1 rounded">{frameUrl}</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Generate Test Frame</h3>
          <Settings className="w-5 h-5 text-muted" />
        </div>

        {/* Test Details */}
        <div className="bg-gray-50 rounded-md p-4">
          <h4 className="font-medium text-gray-900 mb-2">{test.question}</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Response Options:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              {test.options.map((option, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </span>
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Generation Status */}
        {isGenerating && (
          <div className="bg-blue-50 rounded-md p-4">
            <div className="flex items-center space-x-3">
              <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-blue-900">Generating Frame...</p>
                <p className="text-xs text-blue-700">Creating your Farcaster frame for community testing</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary flex-1"
          >
            {isGenerating ? 'Generating...' : 'Generate Frame'}
          </button>
          <button className="btn-outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
        </div>

        {/* Info */}
        <div className="text-xs text-muted bg-gray-50 rounded-md p-3">
          <p className="mb-1">
            <strong>What happens next:</strong>
          </p>
          <ul className="space-y-1">
            <li>• Frame will be generated with your test question</li>
            <li>• Share the frame on Farcaster to collect responses</li>
            <li>• View aggregated results in your dashboard</li>
            <li>• Use insights to validate your fork idea</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
