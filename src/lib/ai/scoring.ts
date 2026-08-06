export interface ScoreBreakdown {
  score: number;
  label: string;
  explanation: string;
  color: string;
}

export function getScoreMetadata(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Exceptional', color: '#10b981' }; // Emerald
  if (score >= 75) return { label: 'Strong', color: '#3b82f6' };    // Blue
  if (score >= 50) return { label: 'Steady', color: '#f59e0b' };    // Amber
  if (score >= 25) return { label: 'Building', color: '#6366f1' };  // Indigo
  return { label: 'Starting', color: '#94a3b8' };                  // Slate
}

export function calculateProductivityScore(data: any): number {
  const { completedTasks = 0, totalTasks = 1, deepWorkHours = 0 } = data;
  
  const taskCompletionRate = (completedTasks / Math.max(totalTasks, 1)) * 50;
  const effortScore = Math.min(deepWorkHours * 5, 50);
  
  return Math.min(Math.round(taskCompletionRate + effortScore), 100);
}

export function calculateMomentumScore(data: any): number {
  const { currentMetrics = 0, previousMetrics = 0 } = data;
  
  if (previousMetrics === 0) return 50;
  
  const growth = ((currentMetrics - previousMetrics) / previousMetrics) * 100;
  const baseScore = 50;
  
  return Math.min(Math.max(Math.round(baseScore + growth), 0), 100);
}

export function calculateCreatorGrowthScore(data: any): number {
  const { 
    newFollowers = 0, 
    engagementRate = 0, 
    viewsCount = 0, 
    previousViews = 0 
  } = data;
  
  // Weights: Engagement (40%), Views Growth (40%), New Followers (20%)
  const engagementScore = Math.min(engagementRate * 10, 40);
  
  let viewsGrowthScore = 20;
  if (previousViews > 0) {
    const growth = ((viewsCount - previousViews) / previousViews) * 100;
    viewsGrowthScore = Math.min(Math.max(20 + (growth / 2), 0), 40);
  }
  
  const followerScore = Math.min(newFollowers / 10, 20);
  
  return Math.min(Math.round(engagementScore + viewsGrowthScore + followerScore), 100);
}
