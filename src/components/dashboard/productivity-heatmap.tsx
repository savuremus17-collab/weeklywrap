"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { useMemo } from "react"

interface ProductivityHeatmapProps {
  className?: string
}

interface DayData {
  day: string
  hours: number
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = Array.from({ length: 12 }, (_, i) => i + 6) // 6AM to 5PM

export function ProductivityHeatmap({ className }: ProductivityHeatmapProps) {
  const data = useMemo(() => {
    // Generate realistic mock productivity data
    return DAYS.map((day) => {
      const dayIndex = DAYS.indexOf(day)
      return {
        day,
        hours: HOURS.map((hour) => {
          const baseProductivity = dayIndex < 5 ? 0.7 : 0.3 // Weekdays more productive
          const timeFactor = hour >= 9 && hour <= 15 ? 0.9 : 0.5 // Core hours
          const randomFactor = 0.5 + Math.random() * 0.5
          return Math.round(baseProductivity * timeFactor * randomFactor * 100)
        }),
      }
    })
  }, [])

  const getIntensity = (value: number): string => {
    if (value >= 80) return "bg-emerald-500/80 border-emerald-500/40"
    if (value >= 60) return "bg-emerald-500/60 border-emerald-500/30"
    if (value >= 40) return "bg-emerald-500/40 border-emerald-500/20"
    if (value >= 20) return "bg-emerald-500/20 border-emerald-500/10"
    return "bg-muted/20 border-muted/5"
  }

  const getTooltip = (day: string, hour: number, value: number): string => {
    const period = hour < 12 ? "AM" : "PM"
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${day} ${displayHour}${period} — ${value}% activity`
  }

  return (
    <GlassCard className={cn("p-6", className)} intensity="low">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Productivity Heatmap</h3>
        <div className="flex items-center gap-1.5">
          {[0, 25, 50, 75, 100].map((level) => (
            <div
              key={level}
              className={cn(
                "h-3 w-3 rounded border",
                level === 0 ? "bg-muted/20 border-muted/5" :
                level === 25 ? "bg-emerald-500/20 border-emerald-500/10" :
                level === 50 ? "bg-emerald-500/40 border-emerald-500/20" :
                level === 75 ? "bg-emerald-500/60 border-emerald-500/30" :
                "bg-emerald-500/80 border-emerald-500/40"
              )}
            />
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {/* Time labels */}
          <div className="flex flex-col gap-1 pr-2 pt-5">
            {HOURS.map((hour) => (
              <div key={hour} className="h-[18px] flex items-center justify-end">
                <span className="text-[9px] text-muted-foreground/60">
                  {hour > 12 ? hour - 12 : hour}{hour < 12 ? "a" : "p"}
                </span>
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex-1">
            <div className="flex gap-1 mb-1">
              {DAYS.map((day) => (
                <div key={day} className="flex-1 text-center">
                  <span className="text-[9px] text-muted-foreground/60 font-medium">{day}</span>
                </div>
              ))}
            </div>
            {HOURS.map((hour, hourIdx) => (
              <div key={hour} className="flex gap-1 mb-[3px]">
                {data.map((dayData) => {
                  const value = dayData.hours[hourIdx]
                  return (
                    <div
                      key={dayData.day}
                      className="group relative flex-1"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (hourIdx * 7 + DAYS.indexOf(dayData.day)) * 0.003 }}
                        className={cn(
                          "h-[18px] rounded-sm border cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-primary/40",
                          getIntensity(value)
                        )}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-50">
                        <div className="bg-popover/95 backdrop-blur-sm border border-border/40 text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-xl">
                          {getTooltip(dayData.day, hour, value)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span>Peak hours: 9AM - 3PM</span>
        <span>Most productive: Wednesday</span>
      </div>
    </GlassCard>
  )
}