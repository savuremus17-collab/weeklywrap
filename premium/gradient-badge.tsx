import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "blue" | "emerald" | "purple"
}

export function GradientBadge({
  children,
  className,
  variant = "blue",
  ...props
}: GradientBadgeProps) {
  const variants = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
    emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-linear-to-r transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
