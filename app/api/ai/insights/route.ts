import { NextRequest, NextResponse } from 'next/server';
import { generateCreatorAnalytics } from '@/lib/ai/creator-analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, creatorHandle, analyticsData, contentPieces } = body;

    if (!platform || !creatorHandle || !analyticsData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateCreatorAnalytics({
      platform,
      creatorHandle,
      analyticsData,
      contentPieces: contentPieces || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error (Creator Analytics):', error);
    return NextResponse.json(
      { error: 'Failed to generate creator analytics' },
      { status: 500 }
    );
  }
}
