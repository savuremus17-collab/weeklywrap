"use client"

import * as React from "react"
import { motion, useInView, useAnimate } from "framer-motion"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: string | number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const numValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9.-]/g, ''), 10) || 0 : value
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope, { once: true })

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 })
    }
  }, [isInView])

  return (
    <motion.span
      ref={scope}
      initial={{ opacity: 0, y: 20 }}
      className={cn("tabular-nums", className)}
    >
      {prefix}{numValue.toLocaleString()}{suffix}
    </motion.span>
  )
}
