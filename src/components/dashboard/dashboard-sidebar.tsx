"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  Menu,
  LogOut,
  User,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "AI Insights", href: "/dashboard/analytics?tab=insights", icon: Sparkles },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
] as const

interface DashboardSidebarProps {
  collapsed?: boolean
  onToggle?: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function DashboardSidebar({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col border-r border-border/40 bg-background/80 backdrop-blur-xl transition-all duration-300",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
      />
    )
  }

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border transition-all duration-300"
      )}
    >
      {/* Logo */}
      <div className={cn("flex h-16 items-center border-b border-sidebar-border/50 px-4", collapsed && "justify-center px-2")}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/25">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  WeeklyWrap
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto hidden lg:flex h-8 w-8", collapsed && "ml-0")}
          onClick={onToggle}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href.split("?")[0])
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-2 py-2.5",
                isActive
                  ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-sidebar-primary/10 to-transparent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative z-10 flex items-center gap-3",
                collapsed && "justify-center"
              )}>
                <Icon className={cn(
                  "h-[18px] w-[18px] transition-all",
                  isActive && "text-sidebar-primary"
                )} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-sidebar-primary",
                    collapsed && "hidden"
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

    {/* User area */}
<div className={cn("border-t border-sidebar-border/50 p-3", collapsed && "px-2")}>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-sidebar-accent",
          collapsed && "justify-center px-2"
        )}
      >
        <Avatar className="h-8 w-8 ring-2 ring-sidebar-primary/20">
          <AvatarImage src="/avatars/user.jpg" alt="User" />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xs text-white">
            JD
          </AvatarFallback>
        </Avatar>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1 overflow-hidden text-left"
            >
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/50 truncate">Pro Plan</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" side="right" sideOffset={8} className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings" className="gap-2 flex items-center">
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="gap-2 text-red-400 cursor-pointer"
        onClick={async () => {
          const { createClient } = await import("@/lib/supabase/client")
          const supabase = createClient()
          await supabase.auth.signOut()
          window.location.href = "/"
        }}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col",
          collapsed ? "w-[72px]" : "w-[260px]"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile header */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border/40 bg-background/80 backdrop-blur-xl px-4 lg:hidden">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onMobileClose}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            WeeklyWrap
          </span>
        </div>
      </div>
    </>
  )
}
