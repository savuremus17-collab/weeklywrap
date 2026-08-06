"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { cn } from "@/lib/utils"
import { FileText, ArrowRight, CheckCircle2, Clock, Send, Eye } from "lucide-react"
import Link from "next/link"
import type { WeeklyReport } from "@/types/dashboard"

interface ReportHistoryProps {
  className?: string
}

const reports: WeeklyReport[] = [
  {
    id: "rpt-1",
    title: "Weekly Design Sprint Recap",
    client: "Acme Corp",
    clientId: "1",
    period: "May 13 - May 19",
    status: "sent",
    score: 92,
    createdAt: "2025-05-19T14:00:00Z",
    updatedAt: "2025-05-19T16:30:00Z",
  },
  {
    id: "rpt-2",
    title: "Q2 Branding Progress",
    client: "DesignStudio",
    clientId: "2",
    period: "May 13 - May 19",
    status: "completed",
    score: 85,
    createdAt: "2025-05-18T10:00:00Z",
    updatedAt: "2025-05-19T09:15:00Z",
  },
  {
    id: "rpt-3",
    title: "Development Sprint Update",
    client: "TechFlow Inc",
    clientId: "3",
    period: "May 13 - May 19",
    status: "generating",
    score: 0,
    createdAt: "2025-05-19T08:00:00Z",
    updatedAt: "2025-05-19T08:00:00Z",
  },
  {
    id: "rpt-4",
    title: "Marketing Analytics Review",
    client: "GrowthLabs",
    clientId: "4",
    period: "May 6 - May 12",
    status: "sent",
    score: 78,
    createdAt: "2025-05-12T14:00:00Z",
    updatedAt: "2025-05-13T10:00:00Z",
  },
  {
    id: "rpt-5",
    title: "Weekly Creative Direction",
    client: "Acme Corp",
    clientId: "1",
    period: "May 6 - May 12",
    status: "draft",
    score: 0,
    createdAt: "2025-05-12T11:00:00Z",
    updatedAt: "2025-05-12T11:00:00Z",
  },
]

const statusConfig = {
  draft: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted/50", label: "Draft" },
  generating: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", label: "Generating" },
  completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Complete" },
  sent: { icon: Send, color: "text-blue-400", bg: "bg-blue-500/10", label: "Sent" },
}

export function ReportHistory({ className }: ReportHistoryProps) {
  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">Recent Reports</h3>
        </div>
        <Link
          href="/dashboard/reports"
          className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          All reports
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-1">
        {reports.slice(0, 4).map((report, index) => {
          const StatusIcon = statusConfig[report.status].icon
          const status = statusConfig[report.status]

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center gap-3 rounded-xl p-3 transition-all hover:bg-accent/40 cursor-pointer"
            >
              <div className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border",
                status.bg,
                `border-${report.status === "draft" ? "border/30" : "border/40"}`
              )}>
                <StatusIcon className={cn("h-4 w-4", status.color)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{report.title}</p>
                  <span className={cn(
                    "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                    status.bg,
                    status.color
                  )}>
                    {status.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground/60">{report.client}</span>
                  <span className="text-[8px] text-muted-foreground/30">•</span>
                  <span className="text-xs text-muted-foreground/60">{report.period}</span>
                </div>
              </div>

              {report.score > 0 && (
                <div className={cn(
                  "text-xs font-bold px-2 py-1 rounded-lg",
                  report.score >= 80 ? "text-emerald-400 bg-emerald-500/10" :
                  report.score >= 60 ? "text-blue-400 bg-blue-500/10" :
                  "text-amber-400 bg-amber-500/10"
                )}>
                  {report.score}
                </div>
              )}

              <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <Eye className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground" />
              </button>
            </motion.div>
          )
        })}
      </div>

      <Link
        href="/dashboard/reports"
        className="mt-3 pt-3 border-t border-border/40 block text-center text-xs text-primary hover:text-primary/80 transition-colors"
      >
        View all {reports.length} reports
      </Link>
    </GlassCard>
  )
}