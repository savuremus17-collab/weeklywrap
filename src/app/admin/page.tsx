'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/premium/glass-card';
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp,
  Activity,
  Zap,
  Target,
  ArrowUpRight,
  MousePointerClick
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 400, users: 24, conversion: 12 },
  { name: 'Tue', revenue: 300, users: 18, conversion: 10 },
  { name: 'Wed', revenue: 600, users: 35, conversion: 15 },
  { name: 'Thu', revenue: 800, users: 42, conversion: 18 },
  { name: 'Fri', revenue: 500, users: 28, conversion: 14 },
  { name: 'Sat', revenue: 900, users: 55, conversion: 22 },
  { name: 'Sun', revenue: 1100, users: 62, conversion: 25 },
];

export default function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: '1,250', icon: Users, change: '+12%', trend: 'up' },
    { label: 'MRR', value: '$12,450', icon: CreditCard, change: '+8%', trend: 'up' },
    { label: 'ARR', value: '$149,400', icon: TrendingUp, change: '+15%', trend: 'up' },
    { label: 'Active Subscriptions', value: '142', icon: Zap, change: '+4%', trend: 'up' },
    { label: 'Churn Rate', value: '2.4%', icon: Activity, change: '-0.5%', trend: 'down' },
    { label: 'Reports Generated', value: '4,580', icon: FileText, change: '+24%', trend: 'up' },
    { label: 'Avg. Conversion', value: '4.8%', icon: Target, change: '+1.2%', trend: 'up' },
    { label: 'Traffic (Weekly)', value: '12.5k', icon: MousePointerClick, change: '+18%', trend: 'up' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive platform performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <GlassCard className="px-4 py-2 flex items-center gap-2 border-primary/20">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">Health: 100%</span>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {stat.change}
                <ArrowUpRight className={`h-3 w-3 ${stat.trend === 'down' ? 'rotate-90' : ''}`} />
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{stat.label}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Stripe Revenue ($)</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Conversion Analytics (%)</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Bar dataKey="conversion" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="font-bold mb-4">AI Usage Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tokens Consumed</span>
              <span className="font-medium">1.2M / 5M</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[24%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Average Latency</span>
              <span className="font-medium">850ms</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[70%]" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">AI Success Rate</span>
              <span className="font-medium">99.2%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[99%]" />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
