"use client"

import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

interface RevenueTrackerProps {
  className?: string
}

const data = [
  { month: "Jan", revenue: 3200, projected: 3200 },
  { month: "Feb", revenue: 3800, projected: 3700 },
  { month: "Mar", revenue: 4200, projected: 4000 },
  { month: "Apr", revenue: 5100, projected: 4800 },
  { month: "May", revenue: 5800, projected: 5500 },
  { month: "Jun", revenue: 6400, projected: 6200 },
  { month: "Jul", revenue: 7100, projected: 6800 },
  { month: "Aug", revenue: 7800, projected: 7500 },
  { month: "Sep", revenue: 8500, projected: 8200 },
  { month: "Oct", revenue: 9200, projected: 8800 },
  { month: "Nov", revenue: 0, projected: 9500 },
  { month: "Dec", revenue: 0, projected: 10000 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-semibold text-emerald-400">
          ${payload[0].value.toLocaleString()}
        </p>
        {payload[1] && (
          <p className="text-xs text-muted-foreground/60">
            Projected: ${payload[1].value.toLocaleString()}
          </p>
        )}
      </div>
    )
  }
  return null
}

export function RevenueTracker({ className }: RevenueTrackerProps) {
  const currentRevenue = data[9]?.revenue || 0
  const previousRevenue = data[8]?.revenue || 0
  const growth = currentRevenue - previousRevenue
  const growthPercent = previousRevenue > 0 ? ((growth / previousRevenue) * 100).toFixed(1) : "0"

  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Revenue Tracker</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold">
              <AnimatedCounter value={currentRevenue} prefix="$" />
            </span>
            <span className="text-xs text-muted-foreground">this month</span>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
          growth >= 0
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        )}>
          {growth >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>{growth >= 0 ? "+" : ""}{growthPercent}%</span>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(val: number) => `$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="url(#projectedGradient)"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              fillOpacity={0.4}
              strokeLinecap="round"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-2 pt-3 border-t border-border/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Projected</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Annual target: $85k</span>
      </div>
    </GlassCard>
  )
}