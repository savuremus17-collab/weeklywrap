"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { AnimatedCounter } from "@/components/ui/premium/animated-counter"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  Plus,
  Send,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
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

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2400 },
  { month: "Apr", revenue: 2800 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 3600 },
]

const reports = [
  { title: "Weekly Design Sprint Recap", date: "May 19, 2025", score: 92, status: "sent" },
  { title: "Weekly Creative Direction", date: "May 12, 2025", score: 78, status: "draft" },
  { title: "Q1 Design Review", date: "Apr 28, 2025", score: 88, status: "sent" },
  { title: "Monthly Brand Update", date: "Apr 14, 2025", score: 85, status: "completed" },
]

export default function ClientDetailPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back button */}
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to clients
      </Link>

      {/* Client header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-border/40">
            <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-lg font-bold text-blue-400">
              AC
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Acme Corp</h1>
              <GradientBadge variant="blue">Active</GradientBadge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Acme Corporation · Partner since Jan 2025</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                sarah@acmecorp.com
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => document.getElementById('contact-info')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Mail className="h-4 w-4" />
            Contact
          </Button>
          <Button
            size="sm"
            className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25"
            onClick={() => window.location.href = "/dashboard/reports/new"}
          >
            <FileText className="h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Reports", value: 14, icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Active Projects", value: 3, icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Revenue Generated", value: 8400, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10", prefix: "$" },
          { label: "Avg. Score", value: 86, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat) => (
          <GlassCard key={stat.label} intensity="low" className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix || ""} />
                </p>
              </div>
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl border", stat.bg, "border-border/40")}>
                <stat.icon className={cn("h-[18px] w-[18px]", stat.color)} />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">Revenue from Client</h2>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} style={{ background: "transparent" }}>
                  <defs>
                    <linearGradient id="clientRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", opacity: 0.6 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#clientRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Recent Reports */}
          <GlassCard intensity="low" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-muted-foreground">Recent Reports</h2>
              <Link href="/dashboard/reports" className="text-xs text-primary hover:text-primary/80">
                View all
              </Link>
            </div>
            <div className="space-y-2">
              {reports.map((report, i) => (
                <Link key={i} href={`/dashboard/reports/rpt-${i + 1}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/40 transition-colors cursor-pointer group">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      report.status === "sent" ? "bg-blue-500/10" :
                      report.status === "draft" ? "bg-muted/50" : "bg-emerald-500/10"
                    )}>
                      <FileText className={cn(
                        "h-4 w-4",
                        report.status === "sent" ? "text-blue-400" :
                        report.status === "draft" ? "text-muted-foreground" : "text-emerald-400"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-md",
                      report.score >= 80 ? "text-emerald-400 bg-emerald-500/10" :
                      "text-blue-400 bg-blue-500/10"
                    )}>{report.score}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Contact info */}
          <GlassCard intensity="low" className="p-5" id="contact-info">
            <h3 className="text-sm font-medium mb-3">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <a href="mailto:sarah@acmecorp.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  sarah@acmecorp.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <a href="tel:+15551234567" className="text-muted-foreground hover:text-foreground transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Client since Jan 2025</span>
              </div>
            </div>
          </GlassCard>

          {/* Projects */}
          <GlassCard intensity="low" className="p-5">
            <h3 className="text-sm font-medium mb-3">Active Projects</h3>
            <div className="space-y-2">
              {["Landing Page Redesign", "Brand Guidelines", "UI Component Library"].map((project, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs">{project}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick actions */}
          <GlassCard intensity="low" className="p-5">
            <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 text-xs"
                onClick={() => window.location.href = "/dashboard/reports/new"}
              >
                <FileText className="h-3.5 w-3.5" />
                Create new report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 text-xs"
                onClick={() => alert("Report sent to client!")}
              >
                <Send className="h-3.5 w-3.5" />
                Send recent report
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-9 text-xs"
                onClick={() => window.location.href = "mailto:sarah@acmecorp.com"}
              >
                <Mail className="h-3.5 w-3.5" />
                Send message
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  )
}
