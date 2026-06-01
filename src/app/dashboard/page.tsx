"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Plus,
  Download,
  RefreshCw,
} from "lucide-react"
import { WeeklyMomentumScore } from "@/components/dashboard/weekly-momentum-score"
import { ProductivityHeatmap } from "@/components/dashboard/productivity-heatmap"
import { RevenueTracker } from "@/components/dashboard/revenue-tracker"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { WeeklyProgressGraph } from "@/components/dashboard/weekly-progress-graph"
import { ClientActivity } from "@/components/dashboard/client-activity"
import { TimeTrackingSummary } from "@/components/dashboard/time-tracking-summary"
import { GrowthTrends } from "@/components/dashboard/growth-trends"
import { StreakSystem } from "@/components/dashboard/streak-system"
import { ReportHistory } from "@/components/dashboard/report-history"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { useEffect, useState } from "react"
import type { DashboardStats } from "@/types/dashboard"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setStats({
        totalReports: 47,
        activeClients: 8,
        weeklyScore: 85,
        revenue: 12400,
        revenueGrowth: 21.6,
        streak: 7,
        hoursTracked: 164,
        aiInsights: 12,
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  const quickStats = [
    {
      label: "Total Reports",
      value: stats?.totalReports ?? 0,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      trend: "+8 this month",
    },
    {
      label: "Active Clients",
      value: stats?.activeClients ?? 0,
      icon: Users,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      trend: "+2 this month",
    },
    {
      label: "Hours Tracked",
      value: stats?.hoursTracked ?? 0,
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      trend: "164h total",
      suffix: "h",
    },
    {
      label: "AI Insights",
      value: stats?.aiInsights ?? 0,
      icon: Sparkles,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      trend: "New this week",
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, <GradientText>John</GradientText>
            </h1>
            <GradientBadge variant="blue">
              <Sparkles className="h-3 w-3 mr-1" />
              Pro
            </GradientBadge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s your weekly overview. You&apos;re on a <span className="text-emerald-400 font-medium">7-day streak</span> 🔥
          </p>
        </div>
        <div className="flex items-center gap-2">
         <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={() => window.location.href = "/dashboard/clients"}>
</Button>
<Button size="sm" className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/25" onClick={() => window.location.href = "/dashboard/reports"}>
  <Plus className="h-4 w-4" />
  New Report
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <GlassCard key={stat.label} intensity="low" className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix || ""}
                    />
                  </p>
                </div>
                <div className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl border",
                  stat.bg,
                  stat.border
                )}>
                  <Icon className={cn("h-[18px] w-[18px]", stat.color)} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground/70">
                <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                {stat.trend}
              </div>
            </GlassCard>
          )
        })}
      </motion.div>

      {/* Main grid */}
      <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
        {/* Left column - main content */}
        <div className="space-y-6 lg:col-span-2">
          <WeeklyMomentumScore score={85} previousScore={72} />
          <WeeklyProgressGraph />
          <RevenueTracker />
          <div className="grid gap-6 md:grid-cols-2">
            <TimeTrackingSummary />
            <GrowthTrends />
          </div>
          <ProductivityHeatmap />
        </div>

        {/* Right column - side content */}
        <div className="space-y-6">
          <AIRecommendations />
          <StreakSystem />
          <ClientActivity />
          <ReportHistory />
          <ActivityTimeline />
        </div>
      </motion.div>

      {/* Bottom section */}
      <motion.div variants={itemVariants} className="pt-2 border-t border-border/30">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground/50">
            Dashboard auto-updates every 15 minutes
          </p>
          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground">
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/40 bg-card/30 p-4 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
              <Skeleton className="h-9 w-9 rounded-xl" />
            </div>
            <Skeleton className="h-3 w-24 mt-3" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              <Skeleton className="h-4 w-36 mb-4" />
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm">
              <Skeleton className="h-4 w-28 mb-4" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
