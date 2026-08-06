import { NextRequest, NextResponse } from 'next/server';
import { generateProductivityInsights } from '@/lib/ai/productivity-insights';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workSessionData, taskStats, userGoals } = body;

    if (!workSessionData || !taskStats) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateProductivityInsights({
      workSessionData,
      taskStats,
      userGoals: userGoals || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error (Productivity Insights):', error);
    return NextResponse.json(
      { error: 'Failed to generate productivity insights' },
      { status: 500 }
    );
  }
}
