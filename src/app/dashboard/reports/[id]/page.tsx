"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import {
  ArrowLeft,
  Download,
  Send,
  Share2,
  Eye,
  Edit3,
  BarChart3,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle2,
  Sparkles,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const performanceData = [
  { day: "Mon", tasks: 8, hours: 6.5, score: 85 },
  { day: "Tue", tasks: 12, hours: 8, score: 92 },
  { day: "Wed", tasks: 10, hours: 7.5, score: 88 },
  { day: "Thu", tasks: 15, hours: 9, score: 95 },
  { day: "Fri", tasks: 7, hours: 5, score: 78 },
  { day: "Sat", tasks: 3, hours: 2, score: 55 },
  { day: "Sun", tasks: 2, hours: 1.5, score: 45 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === "Score" ? "%" : ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ReportDetailPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back button */}
      <Link
        href="/dashboard/reports"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to reports
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Weekly Design Sprint Recap</h1>
            <GradientBadge variant="emerald">Sent</GradientBadge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Acme Corp · May 13 - May 19, 2025
          </p>
        </div>
        <div className="flex items-center gap-2">
         <Link href="/dashboard/reports">
  <Button variant="outline" size="sm" className="h-9 gap-1.5">
    <Edit3 className="h-4 w-4" />
    Edit
  </Button>
</Link>
<Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={() => window.print()}>
  <Download className="h-4 w-4" />
  Export PDF
</Button>
<Button size="sm" className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25" onClick={() => alert("Report sent to client!")}>
  <Send className="h-4 w-4" />
  Send to Client
</Button>
        </div>
      </div>

      {/* Score and quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard intensity="low" className="p-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <div className="relative h-20 w-20 flex items-center justify-center">
                <svg width="80" height="80" className="transform -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
                  <motion.circle
                    cx="40" cy="40" r="34" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"
                    initial={{ strokeDasharray: 213.6, strokeDashoffset: 213.6 }}
                    animate={{ strokeDashoffset: 213.6 * 0.08 }}
                    transition={{ duration: 1.5 }}
                    style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.3))" }}
                  />
                </svg>
                <span className="absolute text-xl font-bold text-emerald-400">92</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Quality Score</p>
          </div>
        </GlassCard>

        {[
          { label: "Total Tasks", value: 57, icon: CheckCircle2, color: "text-blue-400" },
          { label: "Hours Logged", value: 39.5, icon: Clock, color: "text-purple-400" },
          { label: "AI Insights", value: 8, icon: Sparkles, color: "text-amber-400" },
        ].map((stat) => (
          <GlassCard key={stat.label} intensity="low" className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border",
                `bg-${stat.color.split("-")[1]}-500/10 border-${stat.color.split("-")[1]}-500/20`
              )}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Executive Summary */}
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Executive Summary</h2>
            <p className="text-sm leading-relaxed">
              This week was highly productive with <strong className="text-foreground">57 tasks completed</strong> across 4 projects.
              The design sprint for Acme Corp&apos;s new landing page reached its midpoint, with wireframes and initial prototypes
              receiving positive stakeholder feedback. Development velocity increased by <strong className="text-emerald-400">18%</strong> compared to last week,
              and client communication remained seamless with 3 successful review sessions.
            </p>
            <p className="text-sm leading-relaxed mt-2 text-muted-foreground">
              Key highlight: The AI-powered analytics integration was completed ahead of schedule, which is expected to
              improve reporting accuracy by <strong className="text-blue-400">~25%</strong> going forward.
            </p>
          </GlassCard>

          {/* Performance Chart */}
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">Daily Performance</h2>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
               <BarChart data={performanceData} style={{ background: "transparent" }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="tasks" fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={32} name="Tasks" />
                  <Bar dataKey="hours" fill="#6366f1" radius={[4,4,0,0]} maxBarSize={32} name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Trend Chart */}
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">Score Trend</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} style={{ background: "transparent" }}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} fill="url(#scoreGradient)" name="Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <GlassCard intensity="low" className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-medium">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {[
                { insight: "Productivity peaks between 10AM-2PM", impact: "Schedule deep work here" },
                { insight: "Task completion rate up 18%", impact: "Great momentum this week" },
                { insight: "Client response time improved", impact: "Average 2.3 hour response time" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl bg-muted/20 p-3 border border-border/30">
                  <p className="text-xs font-medium">{item.insight}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.impact}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Tasks Completed */}
          <GlassCard intensity="low" className="p-5">
            <h3 className="text-sm font-medium mb-3">Completed Tasks</h3>
            <div className="space-y-2">
              {[
                "Design sprint wireframes review",
                "Client presentation slides",
                "Prototype feedback integration",
                "Analytics dashboard setup",
                "Team sync meeting notes",
                "Weekly status report draft",
                "Stakeholder email updates",
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-muted-foreground">{task}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recommendations */}
          <GlassCard intensity="low" className="p-5">
            <h3 className="text-sm font-medium mb-3">Next Week&apos;s Focus</h3>
            <div className="space-y-2">
              {[
                "Finalize landing page mockups",
                "User testing session prep",
                "Q3 planning kickoff",
                "Client review and approval",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs rounded-lg bg-muted/10 p-2 border border-border/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  )
}
