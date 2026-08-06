import { NextRequest, NextResponse } from 'next/server';
import { generateClientReport } from '@/lib/ai/client-report';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, projectDescription, tasksCompleted, metrics, upcomingMilestones } = body;

    if (!clientName || !tasksCompleted || !metrics) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateClientReport({
      clientName,
      projectDescription,
      tasksCompleted,
      metrics,
      upcomingMilestones,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error (Client Report):', error);
    return NextResponse.json(
      { error: 'Failed to generate client report' },
      { status: 500 }
    );
  }
}
