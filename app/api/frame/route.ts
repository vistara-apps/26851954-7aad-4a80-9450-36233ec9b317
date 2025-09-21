import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { analysisData } = await request.json();

    if (!analysisData) {
      return NextResponse.json(
        { error: 'Analysis data is required' },
        { status: 400 }
      );
    }

    // Generate a unique frame ID
    const frameId = `frame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create frame data
    const frameData = {
      frameId,
      prompt: analysisData.tests?.[0] || "Would you use this enhanced version?",
      options: ["Yes", "Maybe", "No"],
      createdAt: new Date().toISOString(),
      analysisId: analysisData.analysisId
    };

    return NextResponse.json(frameData);
  } catch (error) {
    console.error('Frame creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create frame' },
      { status: 500 }
    );
  }
}

