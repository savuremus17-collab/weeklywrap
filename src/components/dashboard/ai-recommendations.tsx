"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import { Lightbulb, TrendingUp, AlertTriangle, Zap, ArrowRight } from "lucide-react"
import type { AIRecommendation } from "@/types/dashboard"
import { Button } from "@/components/ui/button"

interface AIRecommendationsProps {
  className?: string
}

const recommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Best time to post",
    description: "Your engagement peaks at 2PM on Wednesdays. Schedule your weekly updates then.",
    type: "insight",
    priority: "high",
  },
  {
    id: "2",
    title: "Client report ready",
    description: "Acme Corp's weekly report is 85% complete. A quick review will finish it.",
    type: "action",
    priority: "high",
  },
  {
    id: "3",
    title: "Productivity dip detected",
    description: "Your focus time dropped 23% this week. Consider blocking deep work sessions.",
    type: "alert",
    priority: "medium",
  },
  {
    id: "4",
    title: "Growth opportunity",
    description: "Referral traffic from DesignStudio.co is up 340%. Reach out for more collabs.",
    type: "opportunity",
    priority: "medium",
  },
  {
    id: "5",
    title: "Revenue milestone",
    description: "You're on track to hit $10k/mo by December. Increase your rates 15% now.",
    type: "insight",
    priority: "low",
  },
]

const typeConfig = {
  insight: { icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  action: { icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  alert: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  opportunity: { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
}

export function AIRecommendations({ className }: AIRecommendationsProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30">
            <Lightbulb className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">AI Recommendations</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 text-muted-foreground hover:text-foreground">
          View all
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, index) => {
          const config = typeConfig[rec.type]
          const Icon = config.icon

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                "group flex gap-3 rounded-xl p-3 border transition-all duration-200 cursor-pointer hover:bg-accent/50",
                config.bg,
                config.border
              )}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                config.bg,
                config.border
              )}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{rec.title}</p>
                  <span className={cn(
                    "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                    rec.priority === "high" ? "bg-red-500/10 text-red-400" :
                    rec.priority === "medium" ? "bg-amber-500/10 text-amber-400" :
                    "bg-muted/50 text-muted-foreground"
                  )}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {rec.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border/40">
        <p className="text-[10px] text-muted-foreground/50 text-center">
          Powered by WeeklyWrap AI · Updated 2 hours ago
        </p>
      </div>
    </GlassCard>
  )
}