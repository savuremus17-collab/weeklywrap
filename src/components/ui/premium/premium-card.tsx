"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean
  glow?: boolean
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  ({ className, gradient = false, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-border/50 bg-card p-6 shadow-xl backdrop-blur-sm transition-all duration-200 hover:shadow-2xl",
          gradient && "bg-gradient-to-br from-card to-card/80",
          glow && "shadow-primary/10",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PremiumCard.displayName = "PremiumCard"

export { PremiumCard }
