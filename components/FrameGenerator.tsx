import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Frame, Plus } from 'lucide-react';

interface FrameGeneratorProps {
  variant?: 'input' | 'preview';
  onGenerate?: (prompt: string) => void;
}

export function FrameGenerator({ variant = 'input', onGenerate }: FrameGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      await onGenerate?.(prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  if (variant === 'preview') {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Frame className="h-5 w-5" />
            Differentiation Test Frame
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="aspect-video bg-surface rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <Frame className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Frame Preview</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Yes
              </Button>
              <Button variant="outline" size="sm">
                Maybe
              </Button>
              <Button variant="outline" size="sm">
                No
              </Button>
            </div>
            <Badge variant="secondary">Ready to deploy on Farcaster</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Differentiation Test
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="frame-prompt" className="block text-sm font-medium mb-2">
              Test Prompt
            </label>
            <Input
              id="frame-prompt"
              placeholder="e.g., Would you use a DeFi app with built-in social features?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Generate Frame'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

