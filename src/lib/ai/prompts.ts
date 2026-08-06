export const SYSTEM_PROMPTS = {
  WEEKLY_SUMMARY: `You are an AI productivity expert. Your task is to generate a beautiful, professional weekly summary from raw activity data.
Focus on:
- High-level achievements
- Key wins
- Growth metrics
- Strategic insights for next week
Format the output as structured JSON.`,

  CLIENT_REPORT: `You are a premium agency partner. Your task is to generate a professional, client-ready progress report.
The tone should be:
- Professional yet accessible
- Value-oriented
- Transparent
- Proactive
Focus on delivering clear ROI and demonstrating progress.`,

  CREATOR_ANALYTICS: `You are a creator growth strategist. Analyze raw analytics data to provide deep insights and actionable recommendations.
Focus on:
- Audience engagement
- Content performance
- Platform-specific growth levers
- Viral potential and optimization`,

  PRODUCTIVITY_INSIGHTS: `You are a high-performance coach. Analyze work patterns and output to provide productivity scoring and smart recommendations.
Focus on:
- Momentum and consistency
- Deep work patterns
- Focus areas
- Burnout prevention`,

  SCORING: `You are an expert performance analyst. Evaluate the provided data and assign a score between 0 and 100.
Provide a clear justification for the score.`,
};

export const OUTPUT_SCHEMAS = {
  SCORING: {
    score: 0-100,
    explanation: "Detailed justification for the score",
    strengths: ["Strength 1", "Strength 2"],
    opportunities: ["Opp 1", "Opp 2"]
  },
  WEEKLY_SUMMARY: {
    headline: "Catchy weekly headline",
    executive_summary: "Brief 2-3 sentence overview",
    key_achievements: ["Achievement 1", "Achievement 2"],
    top_metrics: [
      { label: "Metric Name", value: "Value", change: "Percentage or trend" }
    ],
    next_week_focus: ["Focus 1", "Focus 2"],
    momentum_score: 0-100
  },
  CLIENT_REPORT: {
    report_title: "Report Title",
    introduction: "Executive greeting and overview",
    completed_work: [
      { task: "Task Name", impact: "Impact description" }
    ],
    upcoming_milestones: ["Milestone 1", "Milestone 2"],
    strategic_recommendations: ["Rec 1", "Rec 2"],
    client_roi_summary: "Summary of value delivered this week"
  },
  CREATOR_ANALYTICS: {
    growth_score: 0-100,
    engagement_analysis: "Detailed analysis of engagement",
    top_performing_content: [
      { title: "Title", insights: "Why it worked" }
    ],
    growth_opportunities: ["Opp 1", "Opp 2"],
    platform_tips: ["Tip 1", "Tip 2"]
  },
  PRODUCTIVITY_INSIGHTS: {
    productivity_score: 0-100,
    focus_score: 0-100,
    strengths: ["Strength 1", "Strength 2"],
    areas_for_improvement: ["Area 1", "Area 2"],
    smart_action_items: ["Action 1", "Action 2"],
    burnout_risk: "Low/Medium/High"
  }
};
