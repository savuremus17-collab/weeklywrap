import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would fetch from a database or monitoring service
  return NextResponse.json({
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    activeUsers: 0, // Placeholder
    reportsGenerated: 0, // Placeholder
  });
}
