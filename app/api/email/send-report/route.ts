import { NextResponse } from 'next/server';
import { sendClientReportEmail } from '@/lib/email/send';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, clientEmail, professionalName, reportPeriod, aiSummary, reportUrl } = body;

    if (!clientEmail || !reportUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendClientReportEmail({
      clientName,
      clientEmail,
      professionalName,
      reportPeriod,
      aiSummary,
      reportUrl,
    });

    if (result.success) {
      return NextResponse.json({ message: 'Email sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
