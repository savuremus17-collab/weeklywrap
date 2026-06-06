"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientText } from "@/components/ui/premium/gradient-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Check,
  Calendar,
  Eye,
  Users,
  Settings2,
  Wand2,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  { id: "details", label: "Details", icon: FileText },
  { id: "client", label: "Client", icon: Users },
  { id: "customize", label: "Customize", icon: Settings2 },
  { id: "generate", label: "Generate", icon: Wand2 },
]

export default function NewReportPage() {
  const [currentStep, setCurrentStep] = useState(0)
const [generating, setGenerating] = useState(false)
const [generated, setGenerated] = useState(false)
const [reportType, setReportType] = useState("")

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 3000)
  }

  if (generated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6"
          >
            <Check className="h-10 w-10 text-emerald-400" />
          </motion.div>
          <h2 className="text-2xl font-bold">Report Generated!</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Your AI-powered weekly report is ready. You can now review, export, or send it to your client.
          </p>
          <div className="flex gap-3 mt-8">
            <Link href="/dashboard/reports">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Reports
              </Button>
            </Link>
            <Link href="/dashboard/reports/rpt-new">
              <Button className="gap-2 bg-gradient-to-r from-blue-500 to-blue-700">
                <Eye className="h-4 w-4" />
                View Report
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/reports">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">New Report</h1>
          <p className="text-sm text-muted-foreground">
            Create an AI-powered weekly report for your client
          </p>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-0">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                  isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" :
                  isCompleted ? "bg-emerald-500/20 text-emerald-400" :
                  "bg-muted/30 text-muted-foreground/60"
                )}>
                  {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span className={cn(
                  "text-xs font-medium hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground/60"
                )}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "flex-1 h-px mx-3",
                  isCompleted ? "bg-emerald-500/40" : "bg-border/30"
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step content */}
      <GlassCard intensity="low" className="p-6">
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Report Details</h2>
            <p className="text-sm text-muted-foreground">Set the basic information for your report.</p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Report Title</label>
                <Input placeholder="e.g., Weekly Design Sprint Recap" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Report Period</label>
                <div className="grid grid-cols-2 gap-3">
                  <Input type="date" defaultValue="2025-05-13" />
                  <Input type="date" defaultValue="2025-05-19" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Report Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Weekly Summary", "Project Update", "Performance", "Custom"].map((type) => (
  <button
    key={type}
    onClick={() => setReportType(type)}
    className={cn(
      "flex items-center gap-2 rounded-xl border p-3 text-sm transition-colors text-left",
      reportType === type
        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
        : "border-border/40 hover:bg-accent/50"
    )}
  >
    <div className={cn(
      "h-4 w-4 rounded-full border-2 transition-colors",
      reportType === type ? "border-blue-500 bg-blue-500" : "border-border"
    )} />
    {type}
  </button>
))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Select Client</h2>
            <p className="text-sm text-muted-foreground">Choose the client for this report.</p>

            <div className="space-y-2">
              {["Acme Corp", "DesignStudio", "TechFlow Inc", "GrowthLabs"].map((client) => (
                <button
                  key={client}
                  className="flex items-center gap-3 w-full rounded-xl border border-border/40 p-4 text-sm hover:bg-accent/50 transition-colors text-left"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30">
                    <span className="text-xs font-bold text-blue-400">
                      {client.split(" ").map(w => w[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{client}</p>
                    <p className="text-xs text-muted-foreground">3 active projects</p>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-border" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Customize Your Report</h2>
            <p className="text-sm text-muted-foreground">Choose what to include in your AI-generated report.</p>

            <div className="space-y-3">
              {[
                { label: "Executive Summary", desc: "AI-generated overview of the week's highlights" },
                { label: "Key Metrics", desc: "Performance metrics and KPIs" },
                { label: "Work Completed", desc: "Detailed breakdown of completed tasks" },
                { label: "Charts & Visualizations", desc: "Interactive charts for data presentation" },
                { label: "AI Insights & Recommendations", desc: "Smart recommendations based on your data" },
                { label: "Next Week's Plan", desc: "Planned tasks and goals for the upcoming week" },
              ].map((item) => (
                <label
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border/40 p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-border text-primary" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold">Generate Report</h2>
            <p className="text-sm text-muted-foreground">
              WeeklyWrap AI will analyze your data and create a stunning report.
            </p>

            <div className="rounded-xl border border-border/40 bg-gradient-to-br from-blue-500/5 to-purple-600/5 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30">
                  <Sparkles className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold">
                <GradientText>AI-Powered Generation</GradientText>
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Our AI will analyze your weekly activity, project data, and client metrics to create a comprehensive, beautifully designed report.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-left max-w-sm mx-auto">
                {[
                  "Analyzes work activity and project data",
                  "Generates professional summaries",
                  "Creates beautiful data visualizations",
                  "Adds AI-powered insights and recommendations",
                  "Formats in your brand style",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="h-11 px-8 gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/25 text-base"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </GlassCard>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="gap-1"
        >
          Continue
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
