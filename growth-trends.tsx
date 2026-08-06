"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { TrendingUp, TrendingDown } from "lucide-react"

interface GrowthTrendsProps {
  className?: string
}

const metrics = [
  {
    label: "Revenue",
    current: 12400,
    previous: 10200,
    format: (v: number) => `$${v.toLocaleString()}`,
    color: "#3b82f6",
  },
  {
    label: "Clients",
    current: 8,
    previous: 6,
    format: (v: number) => `${v}`,
    color: "#10b981",
  },
  {
    label: "Reports",
    current: 47,
    previous: 38,
    format: (v: number) => `${v}`,
    color: "#f59e0b",
  },
  {
    label: "Hours",
    current: 164,
    previous: 148,
    format: (v: number) => `${v}h`,
    color: "#6366f1",
  },
]

const chartData = [
  { month: "Jul", revenue: 5100, clients: 4, reports: 18, hours: 82 },
  { month: "Aug", revenue: 6400, clients: 5, reports: 22, hours: 96 },
  { month: "Sep", revenue: 7800, clients: 6, reports: 28, hours: 112 },
  { month: "Oct", revenue: 9200, clients: 7, reports: 35, hours: 134 },
  { month: "Nov", revenue: 10800, clients: 8, reports: 42, hours: 152 },
  { month: "Dec", revenue: 12400, clients: 8, reports: 47, hours: 164 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function GrowthTrends({ className }: GrowthTrendsProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Growth Trends</h3>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[10px] text-muted-foreground">6-month growth</span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {metrics.map((metric) => {
          const growth = metric.current - metric.previous
          const growthPercent = metric.previous > 0
            ? ((growth / metric.previous) * 100).toFixed(1)
            : "0"
          const isPositive = growth >= 0

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border/40 bg-muted/20 p-3"
            >
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: metric.color }}>
                <AnimatedCounter
                  value={metric.current}
                  prefix={metric.label === "Revenue" ? "$" : ""}
                />
              </p>
              <div className="flex items-center gap-1 mt-1">
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  isPositive ? "text-emerald-400" : "text-red-400"
                )}>
                  {isPositive ? "+" : ""}{growthPercent}%
                </span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Chart */}
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
              opacity={0.8}
            />
            <Bar
              dataKey="hours"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              maxBarSize={24}
              opacity={0.6}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}