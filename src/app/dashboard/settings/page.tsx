"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  User, Bell, Palette, Key, CreditCard, Globe, LogOut, Save,
  Check, Loader2, Trash2, AlertTriangle, Zap, Crown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PLANS } from "@/lib/stripe/plans"

const TIMEZONES = [
  { group: "Americas", options: ["America/New_York (UTC -5)","America/Chicago (UTC -6)","America/Denver (UTC -7)","America/Los_Angeles (UTC -8)","America/Anchorage (UTC -9)","America/Honolulu (UTC -10)","America/Sao_Paulo (UTC -3)","America/Buenos_Aires (UTC -3)","America/Bogota (UTC -5)","America/Mexico_City (UTC -6)","America/Toronto (UTC -5)","America/Vancouver (UTC -8)"] },
  { group: "Europe", options: ["Europe/London (UTC +0)","Europe/Paris (UTC +1)","Europe/Berlin (UTC +1)","Europe/Rome (UTC +1)","Europe/Madrid (UTC +1)","Europe/Amsterdam (UTC +1)","Europe/Brussels (UTC +1)","Europe/Bucharest (UTC +2)","Europe/Helsinki (UTC +2)","Europe/Athens (UTC +2)","Europe/Moscow (UTC +3)","Europe/Istanbul (UTC +3)"] },
  { group: "Asia", options: ["Asia/Dubai (UTC +4)","Asia/Karachi (UTC +5)","Asia/Kolkata (UTC +5:30)","Asia/Dhaka (UTC +6)","Asia/Bangkok (UTC +7)","Asia/Singapore (UTC +8)","Asia/Shanghai (UTC +8)","Asia/Tokyo (UTC +9)","Asia/Seoul (UTC +9)"] },
  { group: "Africa", options: ["Africa/Cairo (UTC +2)","Africa/Johannesburg (UTC +2)","Africa/Lagos (UTC +1)","Africa/Nairobi (UTC +3)"] },
  { group: "Pacific", options: ["Pacific/Auckland (UTC +12)","Pacific/Sydney (UTC +10)","Pacific/Fiji (UTC +12)"] },
]

const CURRENCIES = ["USD ($) - US Dollar","EUR (€) - Euro","GBP (£) - British Pound","CAD ($) - Canadian Dollar","AUD ($) - Australian Dollar","JPY (¥) - Japanese Yen","CHF (Fr) - Swiss Franc","CNY (¥) - Chinese Yuan","INR (₹) - Indian Rupee","BRL (R$) - Brazilian Real","MXN ($) - Mexican Peso","SGD ($) - Singapore Dollar","HKD ($) - Hong Kong Dollar","NOK (kr) - Norwegian Krone","SEK (kr) - Swedish Krona","DKK (kr) - Danish Krone","PLN (zł) - Polish Zloty","RON (lei) - Romanian Leu","TRY (₺) - Turkish Lira","ZAR (R) - South African Rand","AED (د.إ) - UAE Dirham","SAR (﷼) - Saudi Riyal","KRW (₩) - South Korean Won","NZD ($) - New Zealand Dollar"]

const DEFAULT_NOTIFICATIONS = {
  emailReports: true,
  clientActivity: true,
  aiInsights: true,
  productivityAlerts: false,
  billingUpdates: true,
  marketingEmails: false,
}

const NOTIFICATION_ITEMS = [
  { key: "emailReports", label: "Email Reports", desc: "Receive weekly report summaries via email" },
  { key: "clientActivity", label: "Client Activity", desc: "Get notified when clients view or comment on reports" },
  { key: "aiInsights", label: "AI Insights", desc: "Weekly AI-generated insights and recommendations" },
  { key: "productivityAlerts", label: "Productivity Alerts", desc: "Alerts when your productivity drops significantly" },
  { key: "billingUpdates", label: "Billing Updates", desc: "Payment confirmations and invoice notifications" },
  { key: "marketingEmails", label: "Marketing Emails", desc: "Product updates, tips, and promotional content" },
]

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savingNotif, setSavingNotif] = useState(false)
  const [savedNotif, setSavedNotif] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<{
    plan_type: string | null
    status: string | null
    current_period_end: string | null
    stripe_customer_id: string | null
  } | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [timezone, setTimezone] = useState("Europe/Bucharest (UTC +2)")
  const [currency, setCurrency] = useState("EUR (€) - Euro")
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS)
  const [showSignOutModal, setShowSignOutModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [accentColor, setAccentColor] = useState(() => typeof window !== "undefined" ? localStorage.getItem("accentColor") || "#3b82f6" : "#3b82f6")
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [loadingPortal, setLoadingPortal] = useState(false)
  const [darkMode, setDarkMode] = useState(() => typeof window !== "undefined" ? localStorage.getItem("darkMode") !== "false" : true)

  useEffect(() => {
    const savedColor = localStorage.getItem("accentColor")
    if (savedColor) {
      document.documentElement.style.setProperty("--primary", savedColor)
      document.documentElement.style.setProperty("--ring", savedColor)
      document.documentElement.style.setProperty("--sidebar-primary", savedColor)
    }
    const savedDark = localStorage.getItem("darkMode")
    if (savedDark === "false") document.documentElement.classList.remove("dark")
    else document.documentElement.classList.add("dark")

    const loadUser = async () => {
      try {
        const { supabase } = await import("@/lib/supabase/client")
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          setEmail(user.email || "")
          const { data } = await supabase
            .from("users")
            .select("name, email, company, timezone, currency, notifications")
            .eq("id", user.id)
            .maybeSingle()
          if (data) {
            const parts = (data.name || "").split(" ")
            setFirstName(parts[0] || "")
            setLastName(parts.slice(1).join(" ") || "")
            setEmail(data.email || user.email || "")
            setCompany(data.company || "")
            if (data.timezone) setTimezone(data.timezone)
            if (data.currency) setCurrency(data.currency)
            if (data.notifications) setNotifications({ ...DEFAULT_NOTIFICATIONS, ...data.notifications })
          }
          const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(`avatars/${user.id}.jpg`)
          if (publicUrl) setAvatarUrl(publicUrl)

          const { data: sub } = await supabase
            .from("subscriptions")
            .select("plan_type, status, current_period_end, stripe_customer_id")
            .eq("user_id", user.id)
            .maybeSingle()
          setSubscription(sub || null)
        }
      } catch (e) {
        console.error("Failed to load user profile:", e)
      }
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const { supabase } = await import("@/lib/supabase/client")
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError
      if (!user) {
        setSaveError("Not signed in. Please sign out and sign back in.")
        return
      }
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        name: `${firstName} ${lastName}`.trim(),
        email, company, timezone, currency,
      })
      if (error) throw error
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error: any) {
      setSaveError(error?.message || JSON.stringify(error) || "Unknown error")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setSavingNotif(true)
    setSaveError(null)
    try {
      const { supabase } = await import("@/lib/supabase/client")
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError
      if (!user) {
        setSaveError("Not signed in. Please sign out and sign back in.")
        return
      }
      const { error } = await supabase.from("users").upsert({ id: user.id, notifications })
      if (error) throw error
      setSavedNotif(true)
      setTimeout(() => setSavedNotif(false), 2000)
    } catch (error: any) {
      setSaveError(error?.message || JSON.stringify(error) || "Unknown error")
    } finally {
      setSavingNotif(false)
    }
  }

  const handleSignOut = async () => {
    const { supabase } = await import("@/lib/supabase/client")
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const handleDeleteAccount = async () => {
  if (deleteConfirm !== "DELETE") return
  try {
    const res = await fetch("/api/user/delete", { method: "POST" })
    const data = await res.json()
    if (res.ok) {
      const { supabase } = await import("@/lib/supabase/client")
      await supabase.auth.signOut()
      window.location.href = "/"
    } else {
      alert("Error deleting account: " + data.error)
    }
  } catch (error: any) {
    alert("Something went wrong: " + error.message)
  }
}

  const handleCheckout = async (priceId: string, planId: string) => {
    if (!priceId) return
    setLoadingPlan(planId)
    try {
      const res = await fetch("/api/stripe/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ priceId, successUrl: `${window.location.origin}/dashboard?checkout=success`, cancelUrl: `${window.location.origin}/dashboard/settings` }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert("Error: " + data.error)
    } catch { alert("Something went wrong. Please try again.") }
    finally { setLoadingPlan(null) }
  }

  const handleManageSubscription = async () => {
    setLoadingPortal(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert("Error: " + data.error)
    } catch { alert("Something went wrong. Please try again.") }
    finally { setLoadingPortal(false) }
  }

  const planIcons: Record<string, any> = { pro: Crown, yearly: Crown }
  const planColors: Record<string, string> = {
    pro: "from-blue-500/10 to-blue-600/10 border-blue-500/20",
    yearly: "from-blue-500/10 to-purple-600/10 border-blue-500/20",
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-4">
            <GlassCard intensity="low" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20"><LogOut className="h-5 w-5 text-blue-400" /></div>
                <h2 className="text-lg font-semibold">Sign Out</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Are you sure you want to sign out of your WeeklyWrap account?</p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSignOutModal(false)}>Cancel</Button>
                <Button className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600" onClick={handleSignOut}><LogOut className="h-4 w-4" />Sign Out</Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-4">
            <GlassCard intensity="low" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20"><AlertTriangle className="h-5 w-5 text-red-400" /></div>
                <h2 className="text-lg font-semibold text-red-400">Delete Account</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">This action is <strong className="text-foreground">permanent and irreversible</strong>. All your data, reports, and clients will be deleted.</p>
              <div className="mb-4">
                <label className="text-sm font-medium mb-1.5 block">Type <strong>DELETE</strong> to confirm</label>
                <Input placeholder="DELETE" value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} className="border-red-500/30 focus:border-red-500" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => { setShowDeleteModal(false); setDeleteConfirm("") }}>Cancel</Button>
                <Button className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white" disabled={deleteConfirm !== "DELETE"} onClick={handleDeleteAccount}><Trash2 className="h-4 w-4" />Delete Account</Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account, preferences, and integrations.</p>
      </div>

      {saveError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-red-400">Save failed</p>
            <p className="text-xs text-red-300 mt-1 break-all">{saveError}</p>
          </div>
          <button onClick={() => setSaveError(null)} className="text-red-400 text-xs shrink-0">Dismiss</button>
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-muted/30 border border-border/40">
          <TabsTrigger value="profile" className="gap-1.5 data-[state=active]:bg-background"><User className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 data-[state=active]:bg-background"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5 data-[state=active]:bg-background"><Palette className="h-4 w-4" />Appearance</TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5 data-[state=active]:bg-background"><CreditCard className="h-4 w-4" />Billing</TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5 data-[state=active]:bg-background"><Key className="h-4 w-4" />API</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 ring-2 ring-border/40">
                {avatarUrl && <AvatarImage src={avatarUrl} alt="Avatar" />}
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">{firstName ? firstName[0].toUpperCase() : "?"}</AvatarFallback>
              </Avatar>
              <div>
                <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  try {
                    const { supabase } = await import("@/lib/supabase/client")
                    const { data: { user } } = await supabase.auth.getUser()
                    if (!user) return alert("Not logged in")
                    const fileExt = file.name.split(".").pop()
                    const filePath = `avatars/${user.id}.${fileExt}`
                    const { error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })
                    if (error) throw error
                    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath)
                    setAvatarUrl(publicUrl)
                  } catch (error: any) { alert("Error uploading avatar: " + error.message) }
                }} />
                <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => document.getElementById("avatar-upload")?.click()}>Change Avatar</Button>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div><label className="text-sm font-medium mb-1.5 block">First Name</label><Input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Last Name</label><Input value={lastName} onChange={(e) => setLastName(e.target.value)} /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Email</label><Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" /></div>
              <div><label className="text-sm font-medium mb-1.5 block">Company</label><Input value={company} onChange={(e) => setCompany(e.target.value)} /></div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 mb-4"><Globe className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">Timezone & Locale</span></div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Timezone</label>
                  <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                    {TIMEZONES.map((group) => (<optgroup key={group.group} label={group.group}>{group.options.map((tz) => (<option key={tz} value={tz}>{tz}</option>))}</optgroup>))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Currency</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                    {CURRENCIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
              </div>
            </div>
          </GlassCard>
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="h-9 gap-1.5">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border/40">
                <div><p className="text-sm font-medium">Sign Out</p><p className="text-xs text-muted-foreground">Sign out of your WeeklyWrap account</p></div>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowSignOutModal(true)}><LogOut className="h-4 w-4" />Sign Out</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <div><p className="text-sm font-medium text-red-400">Delete Account</p><p className="text-xs text-muted-foreground">Permanently delete your account and all data</p></div>
                <Button variant="outline" size="sm" className="gap-1.5 border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => setShowDeleteModal(true)}><Trash2 className="h-4 w-4" />Delete Account</Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {NOTIFICATION_ITEMS.map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="flex justify-end">
            <Button onClick={handleSaveNotifications} disabled={savingNotif} className="h-9 gap-1.5">
              {savingNotif ? <Loader2 className="h-4 w-4 animate-spin" /> : savedNotif ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {savingNotif ? "Saving..." : savedNotif ? "Saved!" : "Save Notifications"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Dark Mode</p><p className="text-xs text-muted-foreground">Use dark theme throughout the app</p></div>
                <Switch checked={darkMode} onCheckedChange={(checked) => { setDarkMode(checked); if (checked) { document.documentElement.classList.add("dark"); localStorage.setItem("darkMode", "true") } else { document.documentElement.classList.remove("dark"); localStorage.setItem("darkMode", "false") } }} />
              </div>
              <Separator />
              <div>
                <label className="text-sm font-medium mb-2 block">Accent Color</label>
                <div className="flex gap-3">
                  {["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#e11d48"].map((color) => (
                    <button key={color} onClick={() => { setAccentColor(color); localStorage.setItem("accentColor", color); document.documentElement.style.setProperty("--primary", color); document.documentElement.style.setProperty("--ring", color); document.documentElement.style.setProperty("--sidebar-primary", color) }}
                      className={cn("h-8 w-8 rounded-full border-2 transition-all hover:scale-110", accentColor === color ? "border-white" : "border-border")}
                      style={{ backgroundColor: color, outline: accentColor === color ? `2px solid ${color}` : "none", outlineOffset: "2px" }} />
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div><p className="text-sm font-medium">Compact Mode</p><p className="text-xs text-muted-foreground">Reduce padding and spacing</p></div>
                <Switch />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Current Plan</h2>
              <GradientBadge variant="blue">
                {subscription?.status === "active"
                  ? (subscription.plan_type === "yearly" ? "Yearly" : "Monthly")
                  : "No active plan"}
              </GradientBadge>
            </div>
            {subscription?.status === "active" ? (
              <>
                <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">WeeklyWrap {subscription.plan_type === "yearly" ? "Yearly" : "Monthly"}</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.plan_type === "yearly" ? "$149/year · Billed yearly" : "$15/month · Billed monthly"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{subscription.plan_type === "yearly" ? "$149" : "$15"}</p>
                      <p className="text-xs text-muted-foreground">
                        {subscription.current_period_end
                          ? `Next billing: ${new Date(subscription.current_period_end).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`
                          : "Next billing date unavailable"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleManageSubscription} disabled={loadingPortal}>{loadingPortal ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Manage Subscription</Button>
                  <Button variant="outline" className="flex-1" onClick={handleManageSubscription} disabled={loadingPortal}>View Invoices</Button>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                You don't have an active subscription yet. Pick a plan below to get started.
              </p>
            )}
          </GlassCard>
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-2">Available Plans</h2>
            <p className="text-sm text-muted-foreground mb-6">Upgrade or change your plan at any time.</p>
            <div className="grid gap-4 md:grid-cols-2">
              {PLANS.map((plan) => {
                const Icon = planIcons[plan.id] || Zap
                const isPopular = plan.metadata?.isMostPopular === "true"
                return (
                  <div key={plan.id} className={cn("relative rounded-xl border bg-gradient-to-br p-5", planColors[plan.id])}>
                    {isPopular && <div className="absolute -top-2.5 left-4"><span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">MOST POPULAR</span></div>}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2"><Icon className="h-5 w-5 text-blue-400" /><h3 className="font-semibold">{plan.name}</h3></div>
                      <div className="text-right"><p className="text-lg font-bold">${plan.price}</p><p className="text-xs text-muted-foreground">/{plan.interval}</p></div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                    <ul className="space-y-1.5 mb-4">{plan.features.map((feature) => (<li key={feature} className="flex items-center gap-2 text-xs"><Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" /><span className="text-muted-foreground">{feature}</span></li>))}</ul>
                    <Button className="w-full h-8 text-xs" onClick={() => plan.stripePriceId && handleCheckout(plan.stripePriceId, plan.id)} disabled={loadingPlan === plan.id || !plan.stripePriceId}>
                      {loadingPlan === plan.id ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}
                      {loadingPlan === plan.id ? "Loading..." : `Get ${plan.name}`}
                    </Button>
                  </div>
                )
              })}
            </div>
          </GlassCard>
          {subscription?.stripe_customer_id && (
            <GlassCard intensity="low" className="p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40">
                <div className="flex-1"><p className="text-sm font-medium">Manage your card</p><p className="text-xs text-muted-foreground">View or update your payment method securely in the Stripe billing portal.</p></div>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleManageSubscription} disabled={loadingPortal}>{loadingPortal ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}Open Portal</Button>
              </div>
            </GlassCard>
          )}
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Keys</h2>
            <p className="text-sm text-muted-foreground mb-4">Use these keys to integrate WeeklyWrap with your tools and workflows.</p>
            <div className="space-y-3">
              <div><label className="text-sm font-medium mb-1.5 block">Production API Key</label><div className="flex gap-2"><Input defaultValue="ww_prod_••••••••••••••••••••••••" readOnly className="font-mono text-xs" /><Button variant="outline" size="sm" className="shrink-0 h-9" onClick={() => navigator.clipboard.writeText("ww_prod_example")}>Copy</Button></div></div>
              <div><label className="text-sm font-medium mb-1.5 block">Test API Key</label><div className="flex gap-2"><Input defaultValue="ww_test_••••••••••••••••••••••••" readOnly className="font-mono text-xs" /><Button variant="outline" size="sm" className="shrink-0 h-9" onClick={() => navigator.clipboard.writeText("ww_test_example")}>Copy</Button></div></div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"><p className="text-xs text-amber-400">Keep your API keys secret. Never share them publicly or commit them to version control.</p></div>
            <div className="mt-4"><Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => alert("New key generated!")}><Key className="h-3.5 w-3.5" />Generate New Key</Button></div>
          </GlassCard>
          <GlassCard intensity="low" className="p-6">
            <h2 className="text-lg font-semibold mb-4">API Documentation</h2>
            <p className="text-sm text-muted-foreground mb-4">Learn how to integrate WeeklyWrap into your workflow.</p>
            <Button variant="outline" className="gap-1.5" onClick={() => alert("Documentation coming soon!")}><Globe className="h-4 w-4" />View Documentation</Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
