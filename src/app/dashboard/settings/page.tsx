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
    if (savedDark === "false") document.documentElement.classList.remov
