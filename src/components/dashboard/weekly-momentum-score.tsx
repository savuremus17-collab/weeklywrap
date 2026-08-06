"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface WeeklyMomentumScoreProps {
  score: number
  previousScore: number
  className?: string
}

export function WeeklyMomentumScore({
  score,
  previousScore,
  className,
}: WeeklyMomentumScoreProps) {
  const circumference = 2 * Math.PI * 54
  const progress = score / 100
  const change = score - previousScore
  const changePercent = previousScore > 0 ? ((change / previousScore) * 100).toFixed(1) : "0"

  const getColor = (value: number) => {
    if (value >= 75) return { stroke: "#10b981", glow: "rgba(16, 185, 129, 0.3)", label: "Excellent" }
    if (value >= 50) return { stroke: "#3b82f6", glow: "rgba(59, 130, 246, 0.3)", label: "Good" }
    if (value >= 25) return { stroke: "#f59e0b", glow: "rgba(245, 158, 11, 0.3)", label: "Needs Focus" }
    return { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.3)", label: "Critical" }
  }

  const color = getColor(score)

  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Weekly Momentum Score</h3>
        <span className={cn(
          "text-xs font-semibold px-2 py-0.5 rounded-full",
          score >= 75 ? "bg-emerald-500/10 text-emerald-400" :
          score >= 50 ? "bg-blue-500/10 text-blue-400" :
          score >= 25 ? "bg-amber-500/10 text-amber-400" :
          "bg-red-500/10 text-red-400"
        )}>
          {color.label}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width="130" height="130" className="transform -rotate-90">
            <circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <motion.circle
              cx="65"
              cy="65"
              r="54"
              fill="none"
              stroke={color.stroke}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="drop-shadow-[0_0_8px_var(--tw-shadow-color)]"
              style={{ filter: `drop-shadow(0 0 8px ${color.glow})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <AnimatedCounter
                value={score}
                className="text-3xl font-bold"
                suffix=""
              />
              <p className="text-[10px] text-muted-foreground mt-0.5">out of 100</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          {change > 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : change < 0 ? (
            <TrendingDown className="h-4 w-4 text-red-400" />
          ) : (
            <Minus className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={cn(
            "text-sm font-medium",
            change > 0 ? "text-emerald-400" : change < 0 ? "text-red-400" : "text-muted-foreground"
          )}>
            {change > 0 ? "+" : ""}{changePercent}%
          </span>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/40">
        {[
          { label: "Reports", value: 12 },
          { label: "Hours", value: 28 },
          { label: "Clients", value: 4 },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-lg font-semibold">{item.value}</p>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}