import { NextResponse } from 'next/server';
import { sendWeeklyReportEmail } from '@/lib/email/send';

// In a real app, this would be triggered by a CRON job (e.g., via Vercel Cron or Upstash)
// and would fetch all users who need a report and send it to them.
export async function POST(req: Request) {
  try {
    // Basic auth check for CRON jobs (you'd use a secret token)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // For now, let's allow it in development if CRON_SECRET is not set
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const { email, userName, reportDate, summary, kpis, topAchievements } = body;

    if (!email || !userName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendWeeklyReportEmail(email, {
      userName,
      reportDate,
      summary,
      kpis,
      topAchievements,
    });

    if (result.success) {
      return NextResponse.json({ message: 'Weekly report email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send weekly report email' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
