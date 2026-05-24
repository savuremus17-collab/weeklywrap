"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  User,
  Bell,
  Palette,
  Key,
  CreditCard,
  Globe,
  LogOut,
  Save,
  Check,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, preferences, and integrations.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-muted/30 border border-border/40">
          <TabsTrigger value="profile" className="gap-1.5 data-[state=active]:bg-background">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 data-[state=active]:bg-background">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5 data-[state=active]:bg-background">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 data-[state=active]:bg-background">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5 data-[state=active]:bg-background">
            <Key className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 ring-2 ring-border/40">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name</label>
                <Input defaultValue="John" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                <Input defaultValue="Doe" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input defaultValue="john@example.com" type="email" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Company</label>
                <Input defaultValue="Freelance" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Timezone & Locale</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Timezone</label>
                  <select className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                    <option>America/New_York (UTC -5)</option>
                    <option>America/Chicago (UTC -6)</option>
                    <option>America/Denver (UTC -7)</option>
                    <option>America/Los_Angeles (UTC -8)</option>
                    <option>Europe/London (UTC +0)</option>
                    <option>Europe/Paris (UTC +1)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Currency</label>
                  <select className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-9 gap-1.5"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : saved ? (
                <Check className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>

            <div className="space-y-4">
              {[
                { label: "Email Reports", desc: "Receive weekly report summaries via email", default: true },
                { label: "Client Activity", desc: "Get notified when clients view or comment on reports", default: true },
                { label: "AI Insights", desc: "Weekly AI-generated insights and recommendations", default: true },
                { label: "Productivity Alerts", desc: "Alerts when your productivity drops significantly", default: false },
                { label: "Billing Updates", desc: "Payment confirmations and invoice notifications", default: true },
                { label: "Marketing Emails", desc: "Product updates, tips, and promotional content", default: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Use dark theme throughout the app</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-2 block">Accent Color</label>
                <div className="flex gap-3">
                  {["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#e11d48"].map((color) => (
                    <button
                      key={color}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-all hover:scale-110",
                        color === "#3b82f6" ? "border-blue-400 ring-2 ring-blue-400/30 ring-offset-2 ring-offset-background" : "border-border"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Compact Mode</p>
                  <p className="text-xs text-muted-foreground">Reduce padding and spacing</p>
                </div>
                <Switch />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <GradientBadge variant="blue">Pro</GradientBadge>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">WeeklyWrap Pro</p>
                  <p className="text-sm text-muted-foreground">$15/month · Billed monthly</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">$15</p>
                  <p className="text-xs text-muted-foreground">Next billing: Jun 23, 2025</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                "Unlimited reports",
                "AI-powered insights",
                "Custom branding",
                "PDF exports",
                "Email automation",
                "Priority support",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1">
                Manage Subscription
              </Button>
              <Button variant="outline" className="flex-1">
                View Invoices
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40">
              <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-xs font-bold text-blue-400">
                VISA
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2026</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Update
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Keys</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use these keys to integrate WeeklyWrap with your tools and workflows.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Production API Key</label>
                <div className="flex gap-2">
                  <Input defaultValue="ww_prod_••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                  <Button variant="outline" size="sm" className="shrink-0 h-9">
                    Copy
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Test API Key</label>
                <div className="flex gap-2">
                  <Input defaultValue="ww_test_••••••••••••••••••••••••" readOnly className="font-mono text-xs" />
                  <Button variant="outline" size="sm" className="shrink-0 h-9">
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-xs text-amber-400">
                Keep your API keys secret. Never share them publicly or commit them to version control.
              </p>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Key className="h-3.5 w-3.5" />
                Generate New Key
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Documentation</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to integrate WeeklyWrap into your workflow.
            </p>
            <Button variant="outline" className="gap-1.5">
              <Globe className="h-4 w-4" />
              View Documentation
            </Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}