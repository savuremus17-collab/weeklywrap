"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Clock,
  Sparkles,
  Download,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

const monthlyRevenue = [
  { month: "Jan", revenue: 3200, clients: 4, reports: 12 },
  { month: "Feb", revenue: 3800, clients: 5, reports: 15 },
  { month: "Mar", revenue: 4200, clients: 5, reports: 18 },
  { month: "Apr", revenue: 5100, clients: 6, reports: 22 },
  { month: "May", revenue: 5800, clients: 7, reports: 28 },
  { month: "Jun", revenue: 6400, clients: 8, reports: 35 },
]

const scoreTrend = [
  { week: "W9", score: 62 },
  { week: "W10", score: 68 },
  { week: "W11", score: 72 },
  { week: "W12", score: 65 },
  { week: "W13", score: 78 },
  { week: "W14", score: 82 },
  { week: "W15", score: 85 },
]

const categoryData = [
  { name: "Design", value: 35, color: "#3b82f6" },
  { name: "Development", value: 28, color: "#10b981" },
  { name: "Consulting", value: 20, color: "#f59e0b" },
  { name: "Strategy", value: 17, color: "#6366f1" },
]

const topClients = [
  { name: "Acme Corp", revenue: 8400, reports: 14, growth: 24 },
  { name: "DesignStudio", revenue: 6200, reports: 11, growth: 18 },
  { name: "TechFlow Inc", revenue: 3800, reports: 5, growth: 42 },
  { name: "GrowthLabs", revenue: 3500, reports: 8, growth: 12 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Deep insights into your performance, growth, and client metrics.
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Overview stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: 28500, prefix: "$", icon: TrendingUp, color: "text-emerald-400", change: "+21.6%" },
          { label: "Avg. Score", value: 76, suffix: "%", icon: BarChart3, color: "text-blue-400", change: "+8.2%" },
          { label: "Total Clients", value: 8, icon: Users, color: "text-purple-400", change: "+33.3%" },
          { label: "Reports/Month", value: 18, icon: FileText, color: "text-amber-400", change: "+12.5%" },
        ].map((stat) => (
          <GlassCard key={stat.label} intensity="low" className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/40 bg-muted/20">
                <stat.icon className={cn("h-[18px] w-[18px]", stat.color)} />
              </div>
            </div>
            <p className="text-xs text-emerald-400 mt-2">{stat.change} vs last month</p>
          </GlassCard>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="bg-muted/30 border border-border/40">
          <TabsTrigger value="revenue" className="gap-1.5 data-[state=active]:bg-background">
            <TrendingUp className="h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-1.5 data-[state=active]:bg-background">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="clients" className="gap-1.5 data-[state=active]:bg-background">
            <Users className="h-4 w-4" />
            Clients
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-1.5 data-[state=active]:bg-background">
            <Sparkles className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Revenue Growth</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Clients</span>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={2} name="Clients" dot={{ fill: "#10b981" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard intensity="low" className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue by Category</h3>
              <div className="flex items-center gap-6">
                <div className="h-[140px] w-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" strokeWidth={0}>
                        {categoryData.map((entry, i) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2 text-xs">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                      <span className="font-medium ml-auto">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard intensity="low" className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Clients</h3>
              <div className="space-y-3">
                {topClients.map((client, i) => (
                  <div key={client.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted/30 text-[10px] font-bold text-muted-foreground">
                      {client.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{client.name}</p>
                      <p className="text-[10px] text-muted-foreground">{client.reports} reports</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold">${client.revenue.toLocaleString()}</p>
                      <p className="text-[10px] text-emerald-400">+{client.growth}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Weekly Score Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreTrend}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fill="url(#scoreGrad)" name="Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="grid gap-6 md:grid-cols-2">
            <GlassCard intensity="low" className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Monthly Reports</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reports" fill="#6366f1" radius={[4,4,0,0]} maxBarSize={32} name="Reports" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard intensity="low" className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Key Metrics</h3>
              <div className="space-y-3">
                {[
                  { label: "Avg Response Time", value: "2.3h", change: "-18%", positive: true },
                  { label: "Task Completion Rate", value: "94%", change: "+5%", positive: true },
                  { label: "Client Satisfaction", value: "4.8/5", change: "+0.3", positive: true },
                  { label: "Report Quality Score", value: "85%", change: "+7%", positive: true },
                ].map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
                    <div>
                      <p className="text-xs text-muted-foreground">{metric.label}</p>
                      <p className="text-lg font-semibold mt-0.5">{metric.value}</p>
                    </div>
                    <span className={cn("text-xs font-medium", metric.positive ? "text-emerald-400" : "text-red-400")}>
                      {metric.change}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Client Growth</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="clientGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="clients" stroke="#10b981" strokeWidth={2.5} fill="url(#clientGrad)" name="Clients" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Retention Rate", value: "94%", change: "+2.1%" },
              { label: "Avg. Lifetime", value: "8.5mo", change: "+1.2mo" },
              { label: "Referral Rate", value: "32%", change: "+5%" },
              { label: "Churn Rate", value: "2.1%", change: "-0.8%" },
            ].map((metric) => (
              <GlassCard key={metric.label} intensity="low" className="p-4 text-center">
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold mt-1">{metric.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{metric.change}</p>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Peak Productivity Hours",
                insight: "Your most productive hours are between 10:00 AM and 2:00 PM, with 47% of all tasks completed during this window.",
                impact: "Schedule your most important work during these hours to maximize output.",
                type: "productivity",
              },
              {
                title: "Client Engagement Trend",
                insight: "Client response rate increased by 24% this quarter. Acme Corp shows the highest engagement with 92% report open rate.",
                impact: "Consider offering premium reporting packages to highly engaged clients.",
                type: "clients",
              },
              {
                title: "Revenue Growth Opportunity",
                insight: "Your revenue per client grew 21.6% month-over-month. Recurring clients generate 3.2x more revenue than new ones.",
                impact: "Focus on retention and upsells rather than new client acquisition.",
                type: "revenue",
              },
              {
                title: "Content Performance",
                insight: "Visual reports with charts get 3x more client engagement. Reports with AI insights have a 95% satisfaction rate.",
                impact: "Always include AI-generated insights and data visualizations in your reports.",
                type: "content",
              },
            ].map((item, i) => (
              <GlassCard key={i} intensity="low" className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {item.insight}
                </p>
                <div className="rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-3">
                  <p className="text-[11px] font-medium text-blue-400">Recommended Action</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {item.impact}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}