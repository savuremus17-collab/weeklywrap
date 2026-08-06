import { NextRequest, NextResponse } from 'next/server';
import { 
  calculateProductivityScore, 
  calculateMomentumScore, 
  calculateCreatorGrowthScore,
  getScoreMetadata 
} from '@/lib/ai/scoring';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing type or data' },
        { status: 400 }
      );
    }

    let score: number;
    if (type === 'productivity') {
      score = calculateProductivityScore(data);
    } else if (type === 'momentum') {
      score = calculateMomentumScore(data);
    } else if (type === 'creator_growth') {
      score = calculateCreatorGrowthScore(data);
    } else {
      return NextResponse.json(
        { error: 'Invalid score type' },
        { status: 400 }
      );
    }

    const metadata = getScoreMetadata(score);

    return NextResponse.json({
      score,
      ...metadata,
    });
  } catch (error) {
    console.error('API Error (Scoring):', error);
    return NextResponse.json(
      { error: 'Failed to calculate score' },
      { status: 500 }
    );
  }
}
