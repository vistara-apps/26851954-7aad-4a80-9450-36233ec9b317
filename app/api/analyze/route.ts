import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AnalysisRequest, ProjectAnalysis, ApiResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json();
    const { projectUrl, projectName, focusAreas = [] } = body;

    if (!projectUrl) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        error: 'Project URL is required',
        data: null,
      }, { status: 400 });
    }

    // Initialize OpenAI client at runtime
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    // Generate analysis using AI
    const analysisPrompt = `
      Analyze the following project for ethical forking opportunities:
      
      Project: ${projectName || 'Unknown'}
      URL: ${projectUrl}
      Focus Areas: ${focusAreas.join(', ') || 'General analysis'}
      
      Please provide:
      1. An identified niche or underserved market segment
      2. 3-5 ethical considerations with severity levels
      3. 3-5 suggested features that would add significant value
      4. 2-3 differentiation test questions for community validation
      
      Format the response as a structured analysis focusing on actionable insights for builders.
    `;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in blockchain project analysis and ethical forking strategies. Provide detailed, actionable insights for builders looking to create differentiated projects.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';

    // Parse AI response and structure it (simplified for demo)
    const analysis: ProjectAnalysis = {
      analysisId: `analysis_${Date.now()}`,
      projectName: projectName || extractProjectName(projectUrl),
      projectUrl,
      identifiedNiche: extractNiche(aiResponse),
      ethicalConsiderations: generateEthicalConsiderations(aiResponse),
      suggestedFeatures: generateFeatures(aiResponse),
      differentiationTests: generateTests(aiResponse),
      createdAt: new Date(),
    };

    return NextResponse.json<ApiResponse<ProjectAnalysis>>({
      success: true,
      data: analysis,
      message: 'Analysis completed successfully',
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json<ApiResponse<null>>({
      success: false,
      error: 'Failed to analyze project',
      data: null,
    }, { status: 500 });
  }
}

// Helper functions to parse AI response
function extractProjectName(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '').split('.')[0];
  } catch {
    return 'Unknown Project';
  }
}

function extractNiche(response: string): string {
  // Simple extraction - in production, use more sophisticated parsing
  const nicheMatch = response.match(/niche[:\s]+(.*?)(?:\n|$)/i);
  return nicheMatch?.[1] || 'Underserved market segment identified through AI analysis';
}

function generateEthicalConsiderations(response: string) {
  return [
    {
      id: 'ethical_1',
      title: 'License Compatibility',
      description: 'Verify the original project\'s license allows forking and commercial use',
      status: 'pending' as const,
      severity: 'high' as const,
    },
    {
      id: 'ethical_2',
      title: 'Attribution Requirements',
      description: 'Ensure proper attribution to original creators in documentation and code',
      status: 'pending' as const,
      severity: 'medium' as const,
    },
    {
      id: 'ethical_3',
      title: 'Community Guidelines',
      description: 'Respect the original project\'s community values and contribution guidelines',
      status: 'pending' as const,
      severity: 'low' as const,
    },
  ];
}

function generateFeatures(response: string) {
  return [
    {
      id: 'feature_1',
      title: 'Enhanced User Experience',
      description: 'Streamlined onboarding flow with social login integration',
      priority: 'high' as const,
      estimatedEffort: '2-3 weeks',
      valueProposition: 'Reduces user friction by 60% compared to original',
    },
    {
      id: 'feature_2',
      title: 'Advanced Analytics Dashboard',
      description: 'Real-time metrics and insights for better decision making',
      priority: 'medium' as const,
      estimatedEffort: '3-4 weeks',
      valueProposition: 'Provides data-driven insights not available in original',
    },
    {
      id: 'feature_3',
      title: 'Mobile-First Design',
      description: 'Responsive design optimized for mobile users',
      priority: 'high' as const,
      estimatedEffort: '1-2 weeks',
      valueProposition: 'Captures mobile market segment (70% of users)',
    },
  ];
}

function generateTests(response: string) {
  return [
    {
      id: 'test_1',
      question: 'Would you use a more user-friendly version of this project?',
      options: ['Definitely', 'Probably', 'Maybe', 'Probably not', 'Definitely not'],
    },
    {
      id: 'test_2',
      question: 'What\'s the most important missing feature in the original project?',
      options: ['Better UX', 'Mobile support', 'Advanced analytics', 'Social features'],
    },
  ];
}
