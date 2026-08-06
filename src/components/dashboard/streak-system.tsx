"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { Flame, Trophy, Zap, Target, Star, Sparkles } from "lucide-react"
import type { StreakData } from "@/types/dashboard"

interface StreakSystemProps {
  className?: string
}

const streakData: StreakData = {
  currentStreak: 7,
  longestStreak: 32,
  thisWeek: [true, true, true, true, true, false, false],
  badges: [
    { name: "First Report", icon: "star", earned: true, description: "Created your first report" },
    { name: "Week Streak", icon: "flame", earned: true, description: "7-day reporting streak" },
    { name: "Power User", icon: "zap", earned: true, description: "10 reports in a month" },
    { name: "Growth", icon: "trending-up", earned: false, description: "Reach $10k monthly revenue" },
    { name: "Pro", icon: "trophy", earned: false, description: "Upgrade to Pro plan" },
  ],
}

function BadgeIcon({ name }: { name: string }) {
  switch (name) {
    case "star": return <Star className="h-4 w-4" />
    case "flame": return <Flame className="h-4 w-4" />
    case "zap": return <Zap className="h-4 w-4" />
    case "trophy": return <Trophy className="h-4 w-4" />
    default: return <Sparkles className="h-4 w-4" />
  }
}

export function StreakSystem({ className }: StreakSystemProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Streak System</h3>
        <GradientBadge variant="emerald">
          <Flame className="h-3 w-3 mr-1" />
          On fire!
        </GradientBadge>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-600/20 border border-orange-500/30">
            <Flame className="h-7 w-7 text-orange-400" />
          </div>
          <div>
            <p className="text-2xl font-bold flex items-center gap-1">
              <AnimatedCounter value={streakData.currentStreak} />
              <span className="text-sm font-medium text-muted-foreground">days</span>
            </p>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-400">{streakData.longestStreak}</p>
          <p className="text-xs text-muted-foreground">Best streak</p>
        </div>
      </div>

      {/* Week indicator */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">This week</p>
        <div className="flex gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div
              key={day + i}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                streakData.thisWeek[i]
                  ? "bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-500/40 text-emerald-400 shadow-sm shadow-emerald-500/10"
                  : "bg-muted/20 border border-border/30 text-muted-foreground/40"
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Badges</p>
        <div className="grid grid-cols-5 gap-2">
          {streakData.badges.map((badge) => (
            <motion.div
              key={badge.name}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-default",
                badge.earned
                  ? "bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20"
                  : "bg-muted/10 border border-border/20 opacity-40"
              )}
            >
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                badge.earned
                  ? "bg-gradient-to-br from-amber-500/30 to-amber-600/20 border border-amber-500/30"
                  : "bg-muted/30 border border-border/20"
              )}>
                <BadgeIcon name={badge.icon} />
              </div>
              <p className="text-[8px] text-center leading-tight text-muted-foreground">
                {badge.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}