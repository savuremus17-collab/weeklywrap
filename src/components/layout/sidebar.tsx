"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Home,
  FileText,
  Settings,
  Users,
  CreditCard,
  Zap,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle
} from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const sidebarItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Clients", href: "/dashboard/clients", icon: Users },
  { name: "Integrations", href: "/dashboard/integrations", icon: Zap },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/dashboard" className={cn("flex items-center gap-2 overflow-hidden", isCollapsed && "justify-center w-full")}>
          <div className="bg-linear-to-br from-blue-500 to-blue-700 p-1.5 rounded-lg text-white shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              Weekly<span className="text-blue-500">Wrap</span>
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-2">
        <div className="mb-4">
           {!isCollapsed && <p className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Main Menu</p>}
           {sidebarItems.map((item) => (
             <Link
               key={item.name}
               href={item.href}
               className={cn(
                 "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                 pathname === item.href
                   ? "bg-primary/10 text-primary"
                   : "text-muted-foreground hover:bg-accent hover:text-foreground",
                 isCollapsed && "justify-center px-0"
               )}
             >
               <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", pathname === item.href ? "text-primary" : "")} />
               {!isCollapsed && <span className="font-medium">{item.name}</span>}
               {!isCollapsed && pathname === item.href && (
                 <motion.div
                   layoutId="sidebar-active"
                   className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                 />
               )}
             </Link>
           ))}
        </div>

        <div className="pt-4 border-t border-border">
           <button
             className={cn(
               "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors group",
               isCollapsed && "justify-center px-0"
             )}
           >
             <HelpCircle className="w-5 h-5 group-hover:scale-110" />
             {!isCollapsed && <span className="font-medium">Support</span>}
           </button>
           <button
             className={cn(
               "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group",
               isCollapsed && "justify-center px-0"
             )}
           >
             <LogOut className="w-5 h-5 group-hover:scale-110" />
             {!isCollapsed && <span className="font-medium">Logout</span>}
           </button>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 p-1 bg-background border border-border rounded-full shadow-md hover:bg-accent transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Upgrade Card */}
      {!isCollapsed && (
        <div className="p-4 m-4 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
          <h5 className="text-sm font-bold mb-1 flex items-center gap-2 text-blue-400">
            <PlusCircle className="w-4 h-4" />
            Upgrade to Pro
          </h5>
          <p className="text-xs text-muted-foreground mb-3">
            Get unlimited reports and AI insights.
          </p>
          <Link
            href="/dashboard/billing"
            className="block text-center text-xs font-bold py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  )
}
