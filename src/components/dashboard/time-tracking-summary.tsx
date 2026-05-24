"use client"

import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { Clock } from "lucide-react"

interface TimeTrackingSummaryProps {
  className?: string
}

const data = [
  { name: "Design", hours: 32, color: "#3b82f6", percentage: 35 },
  { name: "Development", hours: 28, color: "#10b981", percentage: 30 },
  { name: "Meetings", hours: 12, color: "#f59e0b", percentage: 13 },
  { name: "Research", hours: 10, color: "#6366f1", percentage: 11 },
  { name: "Admin", hours: 8, color: "#e11d48", percentage: 9 },
  { name: "Other", hours: 2, color: "#8b5cf6", percentage: 2 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.hours} hours ({item.percentage}%)</p>
      </div>
    )
  }
  return null
}

export function TimeTrackingSummary({ className }: TimeTrackingSummaryProps) {
  const totalHours = data.reduce((sum, item) => sum + item.hours, 0)
  const billableHours = data.slice(0, 2).reduce((sum, item) => sum + item.hours, 0)

  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">Time Breakdown</h3>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">
            <AnimatedCounter value={totalHours} />
          </p>
          <p className="text-[10px] text-muted-foreground">total hours</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="h-[140px] w-[140px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={3}
                dataKey="hours"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    className="transition-all duration-200 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-1.5">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
              <span className="text-xs font-medium">{item.hours}h</span>
              <span className="text-[10px] text-muted-foreground/60 w-8 text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-border/40">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Billable Hours</p>
          <p className="text-lg font-semibold text-emerald-400">{billableHours}h</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Billable Rate</p>
          <p className="text-lg font-semibold text-blue-400">$125/hr</p>
        </div>
      </div>
    </GlassCard>
  )
}