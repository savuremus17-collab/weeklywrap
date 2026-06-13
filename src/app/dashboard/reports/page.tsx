"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText, Plus, Search, Filter, Eye, CheckCircle2,
  Clock, Send, Download, Loader2, X, Check,
} from "lucide-react"
import Link from "next/link"
import type { WeeklyReport } from "@/types/dashboard"

const reports: WeeklyReport[] = [
  {
    id: "rpt-1",
    title: "Weekly Design Sprint Recap",
    client: "Acme Corp",
    clientId: "1",
    period: "May 13 - May 19, 2025",
    status: "sent",
    score: 92,
    createdAt: "2025-05-19",
    updatedAt: "2025-05-19",
    summary: "Comprehensive overview of the weekly design sprint including wireframes, prototypes, and stakeholder feedback.",
  },
  {
    id: "rpt-2",
    title: "Q2 Branding Progress",
    client: "DesignStudio",
    clientId: "2",
    period: "May 13 - May 19, 2025",
    status: "completed",
    score: 85,
    createdAt: "2025-05-18",
    updatedAt: "2025-05-19",
    summary: "Progress report on Q2 branding project with visual mockups and style guide updates.",
  },
  {
    id: "rpt-3",
    title: "Development Sprint Update",
    client: "TechFlow Inc",
    clientId: "3",
    period: "May 13 - May 19, 2025",
    status: "generating",
    score: 0,
    createdAt: "2025-05-19",
    updatedAt: "2025-05-19",
    summary: "AI is generating your weekly development sprint report.",
  },
  {
    id: "rpt-4",
    title: "Marketing Analytics Review",
    client: "GrowthLabs",
    clientId: "4",
    period: "May 6 - May 12, 2025",
    status: "sent",
    score: 78,
    createdAt: "2025-05-12",
    updatedAt: "2025-05-13",
    summary: "Weekly marketing analytics review with campaign performance metrics and recommendations.",
  },
  {
    id: "rpt-5",
    title: "Weekly Creative Direction",
    client: "Acme Corp",
    clientId: "1",
    period: "May 6 - May 12, 2025",
    status: "draft",
    score: 0,
    createdAt: "2025-05-12",
    updatedAt: "2025-05-12",
    summary: "Draft creative direction report for Acme Corp's Q3 campaign.",
  },
  {
    id: "rpt-6",
    title: "Social Media Performance",
    client: "DesignStudio",
    clientId: "2",
    period: "Apr 29 - May 5, 2025",
    status: "completed",
    score: 91,
    createdAt: "2025-05-05",
    updatedAt: "2025-05-06",
    summary: "Social media performance analysis with engagement metrics and growth opportunities.",
  },
]

const statusConfig = {
  draft: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted/50", label: "Draft" },
  generating: { icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", label: "Generating" },
  completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Complete" },
  sent: { icon: Send, color: "text-blue-400", bg: "bg-blue-500/10", label: "Sent" },
}

export default function ReportsPage() {
  const [sendingReport, setSendingReport] = useState<WeeklyReport | null>(null)
  const [clientEmail, setClientEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(false)

  const handleSendToClient = async () => {
    if (!sendingReport || !clientEmail) return
    setSending(true)
    try {
      const res = await fetch("/api/email/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: sendingReport.client,
          clientEmail: clientEmail,
          professionalName: "WeeklyWrap User",
          reportPeriod: sendingReport.period,
          aiSummary: sendingReport.summary,
          reportUrl: `${window.location.origin}/dashboard/reports/${sendingReport.id}`,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSentSuccess(true)
        setTimeout(() => {
          setSendingReport(null)
          setClientEmail("")
          setSentSuccess(false)
        }, 2000)
      } else {
        alert("Error: " + data.error)
      }
    } catch (error) {
      alert("Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* Send to Client Modal */}
      {sendingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-4"
          >
            <GlassCard intensity="low" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Send className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Send to Client</h2>
                    <p className="text-xs text-muted-foreground">{sendingReport.title}</p>
                  </div>
                </div>
                <button onClick={() => { setSendingReport(null); setClientEmail("") }} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {sentSuccess ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-3">
                    <Check className="h-7 w-7 text-emerald-400" />
                  </div>
                  <p className="font-medium">Email sent successfully!</p>
                  <p className="text-xs text-muted-foreground mt-1">Report delivered to {clientEmail}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Client</label>
                      <Input value={sendingReport.client} readOnly className="bg-muted/20" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Client Email</label>
                      <Input
                        type="email"
                        placeholder="client@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendToClient()}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Report Period</label>
                      <Input value={sendingReport.period} readOnly className="bg-muted/20" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => { setSendingReport(null); setClientEmail("") }}>
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-blue-700"
                      onClick={handleSendToClient}
                      disabled={sending || !clientEmail}
                    >
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {sending ? "Sending..." : "Send Report"}
                    </Button>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create, manage, and send AI-powered weekly reports to your clients.
          </p>
        </div>
        <Link href="/dashboard/reports/new">
          <Button className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/25">
            <Plus className="h-4 w-4" />
            New Report
          </Button>
        </Link>
      </div>

      {/* Search and filter */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input placeholder="Search reports..." className="pl-9 h-9" />
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-1.5">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Reports grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => {
          const StatusIcon = statusConfig[report.status].icon
          const status = statusConfig[report.status]

          return (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard intensity="low" className="p-5 h-full group cursor-pointer relative">
                <Link href={`/dashboard/reports/${report.id}`} className="block">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl border",
                      status.bg, "border-border/40"
                    )}>
                      <StatusIcon className={cn("h-5 w-5", status.color)} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", status.bg, status.color)}>
                        {status.label}
                      </span>
                      {report.score > 0 && (
                        <span className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded-md",
                          report.score >= 80 ? "text-emerald-400 bg-emerald-500/10" :
                          report.score >= 60 ? "text-blue-400 bg-blue-500/10" :
                          "text-amber-400 bg-amber-500/10"
                        )}>
                          {report.score}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {report.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.summary}</p>
                  <div className="mt-4 pt-3 border-t border-border/30">
                    <div className="flex items-center justify-between text-xs text-muted-foreground/70">
                      <span>{report.client}</span>
                      <span>{report.period}</span>
                    </div>
                  </div>
                </Link>

                {/* Hover actions */}
                <div className="absolute inset-0 rounded-2xl bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link href={`/dashboard/reports/${report.id}`}>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => window.print()}>
                    <Download className="h-3.5 w-3.5" />
                    Export
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1 text-blue-400 hover:text-blue-300"
                    onClick={(e) => {
                      e.preventDefault()
                      setSendingReport(report)
                    }}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>

      {reports.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/30 border border-border/40 mb-4">
            <FileText className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <h3 className="text-lg font-semibold">No reports yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Create your first AI-powered weekly report to get started.</p>
          <Link href="/dashboard/reports/new" className="mt-4">
            <Button className="gap-1.5"><Plus className="h-4 w-4" />Create Report</Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
