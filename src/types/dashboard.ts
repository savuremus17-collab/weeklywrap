export interface WeeklyReport {
  id: string
  title: string
  client: string
  clientId: string
  period: string
  status: "draft" | "generating" | "completed" | "sent"
  score: number
  createdAt: string
  updatedAt: string
  summary?: string
}

export interface Client {
  id: string
  name: string
  email: string
  avatar?: string
  company?: string
  status: "active" | "archived"
  projects: number
  reports: number
  lastActivity: string
  createdAt: string
}

export interface WeeklyDataPoint {
  day: string
  value: number
  label: string
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  growth: number
  projected: number
}

export interface HeatmapData {
  hour: number
  day: string
  value: number
  label: string
}

export interface TimeEntry {
  project: string
  hours: number
  color: string
  percentage: number
}

export interface ActivityItem {
  id: string
  type: "report" | "client" | "insight" | "milestone" | "payment"
  title: string
  description: string
  timestamp: string
  icon?: string
}

export interface AIRecommendation {
  id: string
  title: string
  description: string
  type: "insight" | "action" | "alert" | "opportunity"
  priority: "low" | "medium" | "high"
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  thisWeek: boolean[]
  badges: {
    name: string
    icon: string
    earned: boolean
    description: string
  }[]
}

export interface GrowthTrend {
  metric: string
  current: number
  previous: number
  change: number
  trend: "up" | "down" | "stable"
}

export interface DashboardStats {
  totalReports: number
  activeClients: number
  weeklyScore: number
  revenue: number
  revenueGrowth: number
  streak: number
  hoursTracked: number
  aiInsights: number
}