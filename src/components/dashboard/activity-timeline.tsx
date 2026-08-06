"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  UserPlus,
  Sparkles,
  CreditCard,
  TrendingUp,
  MessageCircle,
} from "lucide-react"
import type { ActivityItem } from "@/types/dashboard"

interface ActivityTimelineProps {
  className?: string
}

const activities: ActivityItem[] = [
  {
    id: "act-1",
    type: "report",
    title: "Report sent to Acme Corp",
    description: "Weekly Design Sprint Recap was delivered",
    timestamp: "2 hours ago",
  },
  {
    id: "act-2",
    type: "insight",
    title: "New AI insight generated",
    description: "Productivity pattern: peak focus at 10AM-12PM",
    timestamp: "4 hours ago",
  },
  {
    id: "act-3",
    type: "client",
    title: "New client added: TechFlow Inc",
    description: "Onboarding checklist completed",
    timestamp: "1 day ago",
  },
  {
    id: "act-4",
    type: "milestone",
    title: "25 reports milestone reached",
    description: "You've generated 25 reports this month",
    timestamp: "2 days ago",
  },
  {
    id: "act-5",
    type: "payment",
    title: "Payment received from DesignStudio",
    description: "$2,400 — Invoice #INV-0042",
    timestamp: "3 days ago",
  },
]

const activityIcons = {
  report: FileText,
  client: UserPlus,
  insight: Sparkles,
  milestone: TrendingUp,
  payment: CreditCard,
}

const activityColors = {
  report: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  client: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  insight: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  milestone: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  payment: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
}

export function ActivityTimeline({ className }: ActivityTimelineProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">Activity Timeline</h3>
        </div>
        <span className="text-[10px] text-muted-foreground/50">Live</span>
      </div>

      <div className="space-y-0">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type]

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="relative flex gap-4 pb-4 pl-8"
            >
              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="absolute left-[11px] top-5 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
              )}

              {/* Icon */}
              <div className={cn(
                "absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border",
                activityColors[activity.type]
              )}>
                <Icon className="h-3 w-3" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-0.5">
                  {activity.description}
                </p>
                <p className="text-[10px] text-muted-foreground/40 mt-0.5">
                  {activity.timestamp}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-1 pt-3 border-t border-border/40">
        <p className="text-center text-[10px] text-muted-foreground/40">
          End of activity feed
        </p>
      </div>
    </GlassCard>
  )
}