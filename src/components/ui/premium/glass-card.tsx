"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high"
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "medium", hover = true, children, ...props }, ref) => {
    const intensities = {
      low: "bg-background/20 backdrop-blur-sm border-white/5",
      medium: "bg-background/40 backdrop-blur-md border-white/10",
      high: "bg-background/60 backdrop-blur-xl border-white/20",
    }

    return (
      <motion.div
        ref={ref as any}
        whileHover={hover ? { scale: 1.01, transition: { duration: 0.2 } } : undefined}
        className={cn(
          "rounded-2xl border shadow-xl overflow-hidden",
          intensities[intensity],
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
