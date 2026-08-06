import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string
  to?: string
  children: React.ReactNode
}

export function GradientText({
  from = "from-blue-400",
  to = "to-blue-600",
  className,
  children,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-linear-to-r",
        from,
        to,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
