"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface WeeklyProgressGraphProps {
  className?: string
}

const data = [
  { week: "W1", score: 42, tasks: 18 },
  { week: "W2", score: 55, tasks: 22 },
  { week: "W3", score: 48, tasks: 20 },
  { week: "W4", score: 68, tasks: 28 },
  { week: "W5", score: 72, tasks: 30 },
  { week: "W6", score: 65, tasks: 26 },
  { week: "W7", score: 78, tasks: 34 },
  { week: "W8", score: 85, tasks: 38 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === "score" ? "%" : ""}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function WeeklyProgressGraph({ className }: WeeklyProgressGraphProps) {
  const currentScore = data[data.length - 1]?.score || 0
  const previousScore = data[data.length - 2]?.score || 0
  const change = currentScore - previousScore

  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Weekly Progress</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">{currentScore}%</span>
            <span className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              change > 0 ? "text-emerald-400" : change < 0 ? "text-red-400" : "text-muted-foreground"
            )}>
              {change > 0 ? <TrendingUp className="h-3 w-3" /> : change < 0 ? <TrendingDown className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
              {change > 0 ? "+" : ""}{change}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">Tasks</span>
          </div>
        </div>
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(val: number) => `${val}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }}
              tickLine={false}
              axisLine={false}
              domain={[0, 50]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine yAxisId="left" y={50} stroke="hsl(var(--border))" strokeDasharray="4 4" strokeOpacity={0.4} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4, stroke: "#3b82f6" }}
              activeDot={{ r: 6, strokeWidth: 2, fill: "#3b82f6", stroke: "hsl(var(--background))" }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="tasks"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4, stroke: "transparent" }}
              activeDot={{ r: 6, strokeWidth: 2, fill: "#10b981", stroke: "hsl(var(--background))" }}
              strokeDasharray="4 2"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}