"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, CheckCircle2, Clock, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ClientActivityProps {
  className?: string
}

const activities = [
  {
    id: "1",
    client: "Acme Corp",
    clientInitials: "AC",
    action: "Report viewed",
    description: "Weekly design sprint report was reviewed",
    time: "2 min ago",
    icon: Eye,
    color: "text-blue-400",
  },
  {
    id: "2",
    client: "DesignStudio",
    clientInitials: "DS",
    action: "Report sent",
    description: "Q2 branding progress report delivered",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  {
    id: "3",
    client: "TechFlow Inc",
    clientInitials: "TF",
    action: "New report generated",
    description: "Weekly development update created",
    time: "3 hours ago",
    icon: FileText,
    color: "text-purple-400",
  },
  {
    id: "4",
    client: "GrowthLabs",
    clientInitials: "GL",
    action: "Feedback submitted",
    description: "Comments on marketing strategy doc",
    time: "5 hours ago",
    icon: Clock,
    color: "text-amber-400",
  },
  {
    id: "5",
    client: "Acme Corp",
    clientInitials: "AC",
    action: "Report approved",
    description: "Monthly analytics report was approved",
    time: "1 day ago",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
]

export function ClientActivity({ className }: ClientActivityProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Client Activity</h3>
        <Link
          href="/dashboard/clients"
          className="text-xs text-primary hover:text-primary/80 transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="space-y-0">
        {activities.map((activity, index) => {
          const Icon = activity.icon

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              className={cn(
                "relative flex gap-3 py-3",
                index < activities.length - 1 && "border-b border-border/30"
              )}
            >
              {/* Timeline line */}
              {index < activities.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-0 w-px bg-border/30" />
              )}

              <Avatar className="h-8 w-8 ring-2 ring-border/40">
                <AvatarFallback className="text-[10px] bg-muted">
                  {activity.clientInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{activity.client}</p>
                  <span className="text-xs text-muted-foreground/60">{activity.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon className={cn("h-3 w-3", activity.color)} />
                  <span className="text-xs text-muted-foreground">{activity.action}</span>
                </div>
                <p className="text-[11px] text-muted-foreground/50 mt-0.5 line-clamp-1">
                  {activity.description}
                </p>
              </div>

              <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors" />
              </button>
            </motion.div>
          )
        })}
      </div>

      <Link
        href="/dashboard/clients"
        className="mt-3 pt-3 border-t border-border/40 block text-center text-xs text-primary hover:text-primary/80 transition-colors"
      >
        View all client activity
      </Link>
    </GlassCard>
  )
}