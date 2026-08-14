"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { GradientBadge } from "@/components/ui/premium/gradient-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import {
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
  Trash2,
  AlertTriangle,
  Zap,
  Crown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { PLANS } from "@/lib/stripe/plans"

const TIMEZONES = [
  {
    group: "Americas",
    options: [
      "America/New_York (UTC -5)",
      "America/Chicago (UTC -6)",
      "America/Denver (UTC -7)",
      "America/Los_Angeles (UTC -8)",
      "America/Anchorage (UTC -9)",
      "America/Honolulu (UTC -10)",
      "America/Sao_Paulo (UTC -3)",
      "America/Buenos_Aires (UTC -3)",
      "America/Bogota (UTC -5)",
      "America/Mexico_City (UTC -6)",
      "America/Toronto (UTC -5)",
      "America/Vancouver (UTC -8)",
    ],
  },
  {
    group: "Europe",
    options: [
      "Europe/London (UTC +0)",
      "Europe/Paris (UTC +1)",
      "Europe/Berlin (UTC +1)",
      "Europe/Rome (UTC +1)",
      "Europe/Madrid (UTC +1)",
      "Europe/Amsterdam (UTC +1)",
      "Europe/Brussels (UTC +1)",
      "Europe/Bucharest (UTC +2)",
      "Europe/Helsinki (UTC +2)",
      "Europe/Athens (UTC +2)",
      "Europe/Moscow (UTC +3)",
      "Europe/Istanbul (UTC +3)",
    ],
  },
  {
    group: "Asia",
    options: [
      "Asia/Dubai (UTC +4)",
      "Asia/Karachi (UTC +5)",
      "Asia/Kolkata (UTC +5:30)",
      "Asia/Dhaka (UTC +6)",
      "Asia/Bangkok (UTC +7)",
      "Asia/Singapore (UTC +8)",
      "Asia/Shanghai (UTC +8)",
      "Asia/Tokyo (UTC +9)",
      "Asia/Seoul (UTC +9)",
    ],
  },
  {
    group: "Africa",
    options: [
      "Africa/Cairo (UTC +2)",
      "Africa/Johannesburg (UTC +2)",
      "Africa/Lagos (UTC +1)",
      "Africa/Nairobi (UTC +3)",
    ],
  },
  {
    group: "Pacific",
    options: [
      "Pacific/Auckland (UTC +12)",
      "Pacific/Sydney (UTC +10)",
      "Pacific/Fiji (UTC +12)",
    ],
  },
]

const CURRENCIES = [
  "USD ($) - US Dollar",
  "EUR (€) - Euro",
  "GBP (£) - British Pound",
  "CAD ($) - Canadian Dollar",
  "AUD ($) - Australian Dollar",
  "JPY (¥) - Japanese Yen",
  "CHF (Fr) - Swiss Franc",
  "CNY (¥) - Chinese Yuan",
  "INR (₹) - Indian Rupee",
  "BRL (R$) - Brazilian Real",
  "MXN ($) - Mexican Peso",
  "SGD ($) - Singapore Dollar",
  "HKD ($) - Hong Kong Dollar",
  "NOK (kr) - Norwegian Krone",
  "SEK (kr) - Swedish Krona",
  "DKK (kr) - Danish Krone",
  "PLN (zł) - Polish Zloty",
  "RON (lei) - Romanian Leu",
  "TRY (₺) - Turkish Lira",
  "ZAR (R) - South African Rand",
  "AED (د.إ) - UAE Dirham",
  "SAR (﷼) - Saudi Riyal",
  "KRW (₩) - South Korean Won",
  "NZD ($) - New Zealand Dollar",
]

const DEFAULT_NOTIFICATIONS = {
  emailReports: true,
  clientActivity: true,
  aiInsights: true,
  productivityAlerts: false,
  billingUpdates: true,
  marketingEmails: false,
}

const NOTIFICATION_ITEMS = [
  {
    key: "emailReports",
    label: "Email Reports",
    desc: "Receive weekly report summaries via email",
  },
  {
    key: "clientActivity",
    label: "Client Activity",
    desc: "Get notified when clients view or comment on reports",
  },
  {
    key: "aiInsights",
    label: "AI Insights",
    desc: "Weekly AI-generated insights and recommendations",
  },
  {
    key: "productivityAlerts",
    label: "Productivity Alerts",
    desc: "Alerts when your productivity drops significantly",
  },
  {
    key: "billingUpdates",
    label: "Billing Updates",
    desc: "Payment confirmations and invoice notifications",
  },
  {
    key: "marketingEmails",
    label: "Marketing Emails",
    desc: "Product updates, tips, and promotional content",
  },
] as const

type AppearanceSettings = {
  darkMode: boolean
  accentColor: string
  compactMode: boolean
}

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

  const [timezone, setTimezone] = useState(
    "Europe/Bucharest (UTC +2)"
  )

  const [currency, setCurrency] = useState(
    "EUR (€) - Euro"
  )

  const [notifications, setNotifications] = useState(
    DEFAULT_NOTIFICATIONS
  )

  const [showSignOutModal, setShowSignOutModal] =
    useState(false)

  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState("")

  const [accentColor, setAccentColor] =
    useState("#3b82f6")

  const [darkMode, setDarkMode] = useState(true)

  const [compactMode, setCompactMode] =
    useState(false)

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null)

  const [loadingPortal, setLoadingPortal] =
    useState(false)

  const [savingAppearance, setSavingAppearance] =
    useState(false)

  const [paymentMethod, setPaymentMethod] =
    useState<{
      brand: string
      last4: string
      expMonth: number
      expYear: number
    } | null>(null)

  const [loadingPaymentMethod, setLoadingPaymentMethod] =
    useState(false)

  /*
   * LOAD USER DATA
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { supabase } =
          await import("@/lib/supabase/client")

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          console.error(
            "Authentication error:",
            authError
          )
          return
        }

        if (!user) {
          console.error("No authenticated user")
          return
        }

        setEmail(user.email || "")

        const {
          data,
          error,
        } = await supabase
          .from("users")
          .select(
            "name, email, company, timezone, currency, notifications, appearance"
          )
          .eq("id", user.id)
          .maybeSingle()

        if (error) {
          console.error(
            "Failed to load user settings:",
            error
          )
        }

        if (data) {
          const parts = (data.name || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)

          setFirstName(parts[0] || "")
          setLastName(
            parts.slice(1).join(" ") || ""
          )

          setEmail(
            data.email ||
              user.email ||
              ""
          )

          setCompany(data.company || "")

          if (data.timezone) {
            setTimezone(data.timezone)
          }

          if (data.currency) {
            setCurrency(data.currency)
          }

          if (data.notifications) {
            setNotifications({
              ...DEFAULT_NOTIFICATIONS,
              ...data.notifications,
            })
          }

          const appearance =
            (data.appearance as
              | Partial<AppearanceSettings>
              | null) || {}

          const loadedDarkMode =
            typeof appearance.darkMode ===
            "boolean"
              ? appearance.darkMode
              : true

          const loadedAccentColor =
            typeof appearance.accentColor ===
            "string"
              ? appearance.accentColor
              : "#3b82f6"

          const loadedCompactMode =
            typeof appearance.compactMode ===
            "boolean"
              ? appearance.compactMode
              : false

          setDarkMode(loadedDarkMode)
          setAccentColor(
            loadedAccentColor
          )
          setCompactMode(
            loadedCompactMode
          )

          document.documentElement.classList.toggle(
            "dark",
            loadedDarkMode
          )

          document.documentElement.style.setProperty(
            "--primary",
            loadedAccentColor
          )

          document.documentElement.style.setProperty(
            "--ring",
            loadedAccentColor
          )

          document.documentElement.style.setProperty(
            "--sidebar-primary",
            loadedAccentColor
          )

          document.documentElement.classList.toggle(
            "compact-mode",
            loadedCompactMode
          )
        }

        /*
         * LOAD AVATAR
         */
        try {
          const {
            data: avatarData,
          } = supabase.storage
            .from("avatars")
            .getPublicUrl(
              `avatars/${user.id}.jpg`
            )

          if (avatarData?.publicUrl) {
            setAvatarUrl(
              `${avatarData.publicUrl}?t=${Date.now()}`
            )
          }
        } catch (avatarError) {
          console.error(
            "Failed to load avatar:",
            avatarError
          )
        }

        /*
         * LOAD PAYMENT METHOD
         */
        try {
          setLoadingPaymentMethod(true)

          const {
            data: {
              session,
            },
          } = await supabase.auth.getSession()

          if (session?.access_token) {
            const paymentResponse =
              await fetch(
                "/api/stripe/payment-method",
                {
                  method: "GET",
                  headers: {
                    Authorization:
                      `Bearer ${session.access_token}`,
                  },
                }
              )

            const paymentData =
              await paymentResponse.json()

            if (paymentResponse.ok) {
              setPaymentMethod(
                paymentData.paymentMethod ||
                  null
              )
            } else {
              console.error(
                "Payment method error:",
                paymentData.error
              )
            }
          }
        } catch (paymentError) {
          console.error(
            "Failed to load payment method:",
            paymentError
          )
        } finally {
          setLoadingPaymentMethod(false)
        }
      } catch (error) {
        console.error(
          "Failed to load user profile:",
          error
        )
      }
    }

    loadUser()
  }, [])

  /*
   * SAVE PROFILE
   */
  const handleSave = async () => {
    setSaving(true)

    try {
      const { supabase } =
        await import("@/lib/supabase/client")

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        throw authError
      }

      if (!user) {
        alert(
          "You're not signed in. Please sign out and sign back in."
        )
        return
      }

      const {
        error,
      } = await supabase
        .from("users")
        .update({
          name:
            `${firstName} ${lastName}`.trim(),
          email,
          company,
          timezone,
          currency,
        })
        .eq("id", user.id)

      if (error) {
        console.error(
          "Profile save error:",
          error
        )
        throw error
      }

      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 2000)
    } catch (error: any) {
      console.error(
        "Error saving profile:",
        error
      )

      alert(
        "Error saving profile: " +
          (error?.message ||
            "Unable to save your profile.")
      )
    } finally {
      setSaving(false)
    }
  }

  /*
   * SAVE NOTIFICATIONS
   */
  const handleSaveNotifications =
    async () => {
      setSavingNotif(true)

      try {
        const { supabase } =
          await import(
            "@/lib/supabase/client"
          )

        const {
          data: { user },
          error: authError,
        } =
          await supabase.auth.getUser()

        if (authError) {
          throw authError
        }

        if (!user) {
          alert(
            "You're not signed in. Please sign out and sign back in."
          )
          return
        }

        const {
          error,
        } = await supabase
          .from("users")
          .update({
            notifications,
          })
          .eq("id", user.id)

        if (error) {
          console.error(
            "Notification save error:",
            error
          )
          throw error
        }

        setSavedNotif(true)

        setTimeout(() => {
          setSavedNotif(false)
        }, 2000)
      } catch (error: any) {
        console.error(
          "Error saving notifications:",
          error
        )

        alert(
          "Error saving notifications: " +
            (error?.message ||
              "Unable to save notification settings.")
        )
      } finally {
        setSavingNotif(false)
      }
    }

  /*
   * SAVE APPEARANCE
   */
  const saveAppearance = async (
    changes: Partial<AppearanceSettings>
  ) => {
    setSavingAppearance(true)

    try {
      const { supabase } =
        await import(
          "@/lib/supabase/client"
        )

      const {
        data: { user },
        error: authError,
      } =
        await supabase.auth.getUser()

      if (authError) {
        throw authError
      }

      if (!user) {
        throw new Error(
          "You are not signed in."
        )
      }

      const {
        data: currentUser,
        error: fetchError,
      } = await supabase
        .from("users")
        .select("appearance")
        .eq("id", user.id)
        .maybeSingle()

      if (fetchError) {
        throw fetchError
      }

      const currentAppearance =
        (currentUser?.appearance as
          | Partial<AppearanceSettings>
          | null) || {}

      const newAppearance: AppearanceSettings =
        {
          darkMode:
            changes.darkMode !==
            undefined
              ? changes.darkMode
              : currentAppearance.darkMode ??
                true,

          accentColor:
            changes.accentColor !==
            undefined
              ? changes.accentColor
              : currentAppearance.accentColor ??
                "#3b82f6",

          compactMode:
            changes.compactMode !==
            undefined
              ? changes.compactMode
              : currentAppearance.compactMode ??
                false,
        }

      const {
        error,
      } = await supabase
        .from("users")
        .update({
          appearance:
            newAppearance,
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      setDarkMode(
        newAppearance.darkMode
      )

      setAccentColor(
        newAppearance.accentColor
      )

      setCompactMode(
        newAppearance.compactMode
      )

      document.documentElement.classList.toggle(
        "dark",
        newAppearance.darkMode
      )

      document.documentElement.style.setProperty(
        "--primary",
        newAppearance.accentColor
      )

      document.documentElement.style.setProperty(
        "--ring",
        newAppearance.accentColor
      )

      document.documentElement.style.setProperty(
        "--sidebar-primary",
        newAppearance.accentColor
      )

      document.documentElement.classList.toggle(
        "compact-mode",
        newAppearance.compactMode
      )
    } catch (error: any) {
      console.error(
        "Error saving appearance:",
        error
      )

      alert(
        "Error saving appearance: " +
          (error?.message ||
            "Unable to save appearance.")
      )
    } finally {
      setSavingAppearance(false)
    }
  }

  /*
   * SIGN OUT
   */
  const handleSignOut = async () => {
    try {
      const { supabase } =
        await import(
          "@/lib/supabase/client"
        )

      await supabase.auth.signOut()

      window.location.href = "/"
    } catch (error: any) {
      alert(
        "Unable to sign out: " +
          (error?.message || "")
      )
    }
  }

  /*
   * DELETE ACCOUNT
   */
  const handleDeleteAccount =
    async () => {
      if (deleteConfirm !== "DELETE") {
        return
      }

      try {
        const res = await fetch(
          "/api/user/delete",
          {
            method: "POST",
          }
        )

        const data = await res.json()

        if (res.ok) {
          const { supabase } =
            await import(
              "@/lib/supabase/client"
            )

          await supabase.auth.signOut()

          window.location.href = "/"
        } else {
          alert(
            "Error deleting account: " +
              data.error
          )
        }
      } catch (error: any) {
        alert(
          "Something went wrong: " +
            (error?.message || "")
        )
      }
    }

  /*
   * STRIPE CHECKOUT
   */
  const handleCheckout = async (
    priceId: string,
    planId: string
  ) => {
    if (!priceId) {
      alert(
        "This plan is not configured with a Stripe Price ID."
      )
      return
    }

    setLoadingPlan(planId)

    try {
      const { supabase } =
        await import(
          "@/lib/supabase/client"
        )

      const {
        data: {
          session,
        },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        alert(
          "Your session has expired. Please sign out and sign in again."
        )
        return
      }

      const res = await fetch(
        "/api/stripe/create-checkout",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            priceId,

            successUrl:
              `${window.location.origin}/dashboard/settings?checkout=success`,

            cancelUrl:
              `${window.location.origin}/dashboard/settings`,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data?.error ||
            "Unable to create checkout session."
        )
      }

      if (!data?.url) {
        throw new Error(
          "Stripe did not return a checkout URL."
        )
      }

      window.location.href =
        data.url
    } catch (error: any) {
      console.error(
        "Checkout error:",
        error
      )

      alert(
        "Checkout error: " +
          (error?.message ||
            "Please try again.")
      )
    } finally {
      setLoadingPlan(null)
    }
  }

  /*
   * STRIPE BILLING PORTAL
   */
  const handleManageSubscription =
    async () => {
      setLoadingPortal(true)

      try {
        const { supabase } =
          await import(
            "@/lib/supabase/client"
          )

        const {
          data: {
            session,
          },
        } = await supabase.auth.getSession()

        if (!session?.access_token) {
          alert(
            "Your session has expired. Please sign out and sign in again."
          )
          return
        }

        const res = await fetch(
          "/api/stripe/portal",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${session.access_token}`,
            },
          }
        )

        const data = await res.json()

        if (!res.ok) {
          throw new Error(
            data?.error ||
              "Unable to open billing portal."
          )
        }

        if (!data?.url) {
          throw new Error(
            "Stripe did not return a billing portal URL."
          )
        }

        window.location.href =
          data.url
      } catch (error: any) {
        console.error(
          "Billing portal error:",
          error
        )

        alert(
          "Billing error: " +
            (error?.message ||
              "Please try again.")
        )
      } finally {
        setLoadingPortal(false)
      }
    }

  const planIcons: Record<
    string,
    any
  > = {
    pro: Crown,
    yearly: Crown,
  }

  const planColors: Record<
    string,
    string
  > = {
    pro:
      "from-blue-500/10 to-blue-600/10 border-blue-500/20",

    yearly:
      "from-blue-500/10 to-purple-600/10 border-blue-500/20",
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-md mx-4"
          >
            <GlassCard
              intensity="low"
              className="p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20">
                  <LogOut className="h-5 w-5 text-blue-400" />
                </div>

                <h2 className="text-lg font-semibold">
                  Sign Out
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to sign out of your WeeklyWrap account?
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    setShowSignOutModal(
                      false
                    )
                  }
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 gap-2 bg-blue-500 hover:bg-blue-600"
                  onClick={
                    handleSignOut
                  }
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="w-full max-w-md mx-4"
          >
            <GlassCard
              intensity="low"
              className="p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>

                <h2 className="text-lg font-semibold text-red-400">
                  Delete Account
                </h2>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                This action is{" "}
                <strong className="text-foreground">
                  permanent and irreversible
                </strong>
                . All your data, reports, and clients will be deleted.
              </p>

              <div className="mb-4">
                <label className="text-sm font-medium mb-1.5 block">
                  Type{" "}
                  <strong>DELETE</strong>{" "}
                  to confirm
                </label>

                <Input
                  placeholder="DELETE"
                  value={deleteConfirm}
                  onChange={(e) =>
                    setDeleteConfirm(
                      e.target.value
                    )
                  }
                  className="border-red-500/30 focus:border-red-500"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowDeleteModal(
                      false
                    )
                    setDeleteConfirm("")
                  }}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white"
                  disabled={
                    deleteConfirm !==
                    "DELETE"
                  }
                  onClick={
                    handleDeleteAccount
                  }
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Settings
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, preferences, and integrations.
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        className="space-y-4"
      >
        <TabsList className="bg-muted/30 border border-border/40">
          <TabsTrigger
            value="profile"
            className="gap-1.5 data-[state=active]:bg-background"
          >
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>

          <TabsTrigger
            value="notifications"
            className="gap-1.5 data-[state=active]:bg-background"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>

          <TabsTrigger
            value="appearance"
            className="gap-1.5 data-[state=active]:bg-background"
          >
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>

          <TabsTrigger
            value="billing"
            className="gap-1.5 data-[state=active]:bg-background"
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>

          <TabsTrigger
            value="api"
            className="gap-1.5 data-[state=active]:bg-background"
          >
            <Key className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* PROFILE */}

        <TabsContent
          value="profile"
          className="space-y-6"
        >
          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Personal Information
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 ring-2 ring-border/40">
                {avatarUrl && (
                  <AvatarImage
                    src={avatarUrl}
                    alt="Avatar"
                  />
                )}

                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
                  {firstName
                    ? firstName[0].toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>

              <div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={async (e) => {
                    const file =
                      e.target.files?.[0]

                    if (!file) {
                      return
                    }

                    if (
                      file.size >
                      2 * 1024 * 1024
                    ) {
                      alert(
                        "Avatar must be smaller than 2MB."
                      )
                      return
                    }

                    try {
                      const {
                        supabase,
                      } =
                        await import(
                          "@/lib/supabase/client"
                        )

                      const {
                        data: {
                          user,
                        },
                      } =
                        await supabase.auth.getUser()

                      if (!user) {
                        alert(
                          "Not logged in."
                        )
                        return
                      }

                      const filePath =
                        `avatars/${user.id}.jpg`

                      const {
                        error,
                      } =
                        await supabase.storage
                          .from(
                            "avatars"
                          )
                          .upload(
                            filePath,
                            file,
                            {
                              upsert: true,
                              contentType:
                                file.type,
                              cacheControl:
                                "3600",
                            }
                          )

                      if (error) {
                        throw error
                      }

                      const {
                        data: {
                          publicUrl,
                        },
                      } =
                        supabase.storage
                          .from(
                            "avatars"
                          )
                          .getPublicUrl(
                            filePath
                          )

                      setAvatarUrl(
                        `${publicUrl}?t=${Date.now()}`
                      )
                    } catch (
                      error: any
                    ) {
                      console.error(
                        "Avatar upload error:",
                        error
                      )

                      alert(
                        "Error uploading avatar: " +
                          (error?.message ||
                            "Upload failed.")
                      )
                    }
                  }}
                />

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() =>
                    document
                      .getElementById(
                        "avatar-upload"
                      )
                      ?.click()
                  }
                >
                  Change Avatar
                </Button>

                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  First Name
                </label>

                <Input
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Last Name
                </label>

                <Input
                  value={lastName}
                  onChange={(e) =>
                    setLastName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Email
                </label>

                <Input
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  type="email"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Company
                </label>

                <Input
                  value={company}
                  onChange={(e) =>
                    setCompany(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm font-medium">
                  Timezone & Locale
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Timezone
                  </label>

                  <select
                    value={timezone}
                    onChange={(e) =>
                      setTimezone(
                        e.target.value
                      )
                    }
                    className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {TIMEZONES.map(
                      (group) => (
                        <optgroup
                          key={
                            group.group
                          }
                          label={
                            group.group
                          }
                        >
                          {group.options.map(
                            (tz) => (
                              <option
                                key={tz}
                                value={tz}
                              >
                                {tz}
                              </option>
                            )
                          )}
                        </optgroup>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(
                        e.target.value
                      )
                    }
                    className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {CURRENCIES.map(
                      (c) => (
                        <option
                          key={c}
                          value={c}
                        >
                          {c}
                        </option>
                      )
                    )}
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

              {saving
                ? "Saving..."
                : saved
                  ? "Saved!"
                  : "Save Changes"}
            </Button>
          </div>

          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Account Actions
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border/40">
                <div>
                  <p className="text-sm font-medium">
                    Sign Out
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Sign out of your WeeklyWrap account
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() =>
                    setShowSignOutModal(
                      true
                    )
                  }
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <div>
                  <p className="text-sm font-medium text-red-400">
                    Delete Account
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() =>
                    setShowDeleteModal(
                      true
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* NOTIFICATIONS */}

        <TabsContent
          value="notifications"
          className="space-y-6"
        >
          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {NOTIFICATION_ITEMS.map(
                (item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {item.label}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>

                    <Switch
                      checked={
                        notifications[
                          item.key
                        ]
                      }
                      onCheckedChange={(
                        checked
                      ) =>
                        setNotifications(
                          (prev) => ({
                            ...prev,
                            [item.key]:
                              checked,
                          })
                        )
                      }
                    />
                  </div>
                )
              )}
            </div>
          </GlassCard>

          <div className="flex justify-end">
            <Button
              onClick={
                handleSaveNotifications
              }
              disabled={savingNotif}
              className="h-9 gap-1.5"
            >
              {savingNotif ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : savedNotif ? (
                <Check className="h-4 w-4" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {savingNotif
                ? "Saving..."
                : savedNotif
                  ? "Saved!"
                  : "Save Notifications"}
            </Button>
          </div>
        </TabsContent>

        {/* APPEARANCE */}

        <TabsContent
          value="appearance"
          className="space-y-6"
        >
          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Appearance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">
                    Dark Mode
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Use dark theme throughout the app
                  </p>
                </div>

                <Switch
                  checked={darkMode}
                  disabled={
                    savingAppearance
                  }
                  onCheckedChange={async (
                    checked
                  ) => {
                    setDarkMode(
                      checked
                    )

                    document.documentElement.classList.toggle(
                      "dark",
                      checked
                    )

                    await saveAppearance({
                      darkMode:
                        checked,
                    })
                  }}
                />
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Accent Color
                </label>

                <div className="flex gap-3">
                  {[
                    "#3b82f6",
                    "#10b981",
                    "#8b5cf6",
                    "#f59e0b",
                    "#e11d48",
                  ].map(
                    (color) => (
                      <button
                        key={color}
                        type="button"
                        disabled={
                          savingAppearance
                        }
                        onClick={async () => {
                          setAccentColor(
                            color
                          )

                          document.documentElement.style.setProperty(
                            "--primary",
                            color
                          )

                          document.documentElement.style.setProperty(
                            "--ring",
                            color
                          )

                          document.documentElement.style.setProperty(
                            "--sidebar-primary",
                            color
                          )

                          await saveAppearance(
                            {
                              accentColor:
                                color,
                            }
                          )
                        }}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-all hover:scale-110",
                          accentColor ===
                            color
                            ? "border-white"
                            : "border-border"
                        )}
                        style={{
                          backgroundColor:
                            color,
                          outline:
                            accentColor ===
                            color
                              ? `2px solid ${color}`
                              : "none",
                          outlineOffset:
                            "2px",
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">
                    Compact Mode
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Reduce padding and spacing
                  </p>
                </div>

                <Switch
                  checked={
                    compactMode
                  }
                  disabled={
                    savingAppearance
                  }
                  onCheckedChange={async (
                    checked
                  ) => {
                    setCompactMode(
                      checked
                    )

                    document.documentElement.classList.toggle(
                      "compact-mode",
                      checked
                    )

                    await saveAppearance({
                      compactMode:
                        checked,
                    })
                  }}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* BILLING */}

        <TabsContent
          value="billing"
          className="space-y-6"
        >
          <GlassCard
            intensity="low"
            className="p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Current Plan
              </h2>

              <GradientBadge variant="blue">
                Pro
              </GradientBadge>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    WeeklyWrap Pro
                  </p>

                  <p className="text-sm text-muted-foreground">
                    $15/month · Billed monthly
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold">
                    $15
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Managed by Stripe
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={
                  handleManageSubscription
                }
                disabled={
                  loadingPortal
                }
              >
                {loadingPortal ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}

                Manage Subscription
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={
                  handleManageSubscription
                }
                disabled={
                  loadingPortal
                }
              >
                View Invoices
              </Button>
            </div>
          </GlassCard>

          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-2">
              Available Plans
            </h2>

            <p className="text-sm text-muted-foreground mb-6">
              Upgrade or change your plan at any time.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {PLANS.map((plan) => {
                const Icon =
                  planIcons[plan.id] ||
                  Zap

                const isPopular =
                  plan.metadata
                    ?.isMostPopular ===
                  "true"

                return (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative rounded-xl border bg-gradient-to-br p-5",
                      planColors[
                        plan.id
                      ]
                    )}
                  >
                    {isPopular && (
                      <div className="absolute -top-2.5 left-4">
                        <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-blue-400" />

                        <h3 className="font-semibold">
                          {plan.name}
                        </h3>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold">
                          ${plan.price}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          /{plan.interval}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">
                      {plan.description}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {plan.features.map(
                        (feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-xs"
                          >
                            <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />

                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        )
                      )}
                    </ul>

                    <Button
                      className="w-full h-8 text-xs"
                      onClick={() => {
                        if (
                          plan.stripePriceId
                        ) {
                          handleCheckout(
                            plan.stripePriceId,
                            plan.id
                          )
                        }
                      }}
                      disabled={
                        loadingPlan ===
                          plan.id ||
                        !plan.stripePriceId
                      }
                    >
                      {loadingPlan ===
                      plan.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                      ) : null}

                      {loadingPlan ===
                      plan.id
                        ? "Loading..."
                        : !plan.stripePriceId
                          ? "Unavailable"
                          : `Get ${plan.name}`}
                    </Button>
                  </div>
                )
              })}
            </div>
          </GlassCard>

          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              Payment Method
            </h2>

            <div className="flex items-center gap-3 p-3 rounded-xl border border-border/40">
              {loadingPaymentMethod ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />

                  <p className="text-sm text-muted-foreground">
                    Loading payment method...
                  </p>
                </>
              ) : paymentMethod ? (
                <>
                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-xs font-bold uppercase text-blue-400">
                    {paymentMethod.brand}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {paymentMethod.brand}{" "}
                      ending in{" "}
                      {paymentMethod.last4}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Expires{" "}
                      {String(
                        paymentMethod.expMonth
                      ).padStart(2, "0")}
                      /
                      {
                        paymentMethod.expYear
                      }
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={
                      handleManageSubscription
                    }
                    disabled={
                      loadingPortal
                    }
                  >
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      No payment method
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Add a payment method through Stripe.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={
                      handleManageSubscription
                    }
                    disabled={
                      loadingPortal
                    }
                  >
                    Add Payment Method
                  </Button>
                </>
              )}
            </div>
          </GlassCard>
        </TabsContent>

        {/* API */}

        <TabsContent
          value="api"
          className="space-y-6"
        >
          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              API Keys
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              Use these keys to integrate WeeklyWrap with your tools and workflows.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Production API Key
                </label>

                <div className="flex gap-2">
                  <Input
                    defaultValue="ww_prod_••••••••••••••••••••••••"
                    readOnly
                    className="font-mono text-xs"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-9"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "ww_prod_example"
                      )
                    }
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Test API Key
                </label>

                <div className="flex gap-2">
                  <Input
                    defaultValue="ww_test_••••••••••••••••••••••••"
                    readOnly
                    className="font-mono text-xs"
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 h-9"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        "ww_test_example"
                      )
                    }
                  >
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
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() =>
                  alert(
                    "New key generated!"
                  )
                }
              >
                <Key className="h-3.5 w-3.5" />
                Generate New Key
              </Button>
            </div>
          </GlassCard>

          <GlassCard
            intensity="low"
            className="p-6"
          >
            <h2 className="text-lg font-semibold mb-4">
              API Documentation
            </h2>

            <p className="text-sm text-muted-foreground mb-4">
              Learn how to integrate WeeklyWrap into your workflow.
            </p>

            <Button
              variant="outline"
              className="gap-1.5"
              onClick={() =>
                alert(
                  "Documentation coming soon!"
                )
              }
            >
              <Globe className="h-4 w-4" />
              View Documentation
            </Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
