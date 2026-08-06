import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklySummary } from '@/lib/ai/weekly-summary';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userName, activities, metrics, previousSummary } = body;

    if (!userName || !activities || !metrics) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateWeeklySummary({
      userName,
      activities,
      metrics,
      previousSummary,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error (Weekly Summary):', error);
    return NextResponse.json(
      { error: 'Failed to generate weekly summary' },
      { status: 500 }
    );
  }
}
