import { resend } from '@/lib/resend';
import WelcomeEmail from './templates/welcome';
import MagicLinkEmail from './templates/magic-link';
import WeeklyReportEmail from './templates/weekly-report';
import ClientReportEmail from './templates/client-report';
import * as React from 'react';

const FROM_EMAIL = process.env.FROM_EMAIL || 'WeeklyWrap <hello@weeklywrap.ai>';

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to WeeklyWrap!',
      react: WelcomeEmail({ userFirstname: firstName }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending welcome email:', error);
    return { success: false, error };
  }
}

export async function sendMagicLinkEmail(email: string, url: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Magic Link for WeeklyWrap',
      react: MagicLinkEmail({ url }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending magic link email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending magic link email:', error);
    return { success: false, error };
  }
}

interface WeeklyReportData {
  userName: string;
  reportDate: string;
  summary: string;
  kpis: { label: string; value: string; change?: string; trend?: 'up' | 'down' }[];
  topAchievements: string[];
}

export async function sendWeeklyReportEmail(email: string, reportData: WeeklyReportData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your Weekly Wrap is ready - ${reportData.reportDate}`,
      react: WeeklyReportEmail(reportData) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending weekly report email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending weekly report email:', error);
    return { success: false, error };
  }
}

interface ClientReportData {
  clientName: string;
  clientEmail: string;
  professionalName: string;
  reportPeriod: string;
  aiSummary: string;
  reportUrl: string;
}

export async function sendClientReportEmail(reportData: ClientReportData) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: reportData.clientEmail,
      subject: `Progress Report: ${reportData.reportPeriod} - ${reportData.professionalName}`,
      react: ClientReportEmail({
        clientName: reportData.clientName,
        professionalName: reportData.professionalName,
        reportPeriod: reportData.reportPeriod,
        aiSummary: reportData.aiSummary,
        reportUrl: reportData.reportUrl,
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending client report email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error sending client report email:', error);
    return { success: false, error };
  }
}
