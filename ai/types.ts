export interface WeeklySummary {
  headline: string;
  executive_summary: string;
  key_achievements: string[];
  top_metrics: {
    label: string;
    value: string;
    change: string;
  }[];
  next_week_focus: string[];
  momentum_score: number;
}

export interface ClientReport {
  report_title: string;
  introduction: string;
  completed_work: {
    task: string;
    impact: string;
  }[];
  upcoming_milestones: string[];
  strategic_recommendations: string[];
  client_roi_summary: string;
}

export interface CreatorAnalytics {
  growth_score: number;
  engagement_analysis: string;
  top_performing_content: {
    title: string;
    insights: string;
  }[];
  growth_opportunities: string[];
  platform_tips: string[];
}

export interface ProductivityInsights {
  productivity_score: number;
  focus_score: number;
  strengths: string[];
  areas_for_improvement: string[];
  smart_action_items: string[];
  burnout_risk: 'Low' | 'Medium' | 'High';
}

export interface AIResponseMetadata {
  model: string;
  tokens_used: number;
  latency_ms: number;
}
