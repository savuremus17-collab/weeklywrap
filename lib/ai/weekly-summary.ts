import { getAICompletion } from './openai';
import { SYSTEM_PROMPTS, OUTPUT_SCHEMAS } from './prompts';
import { WeeklySummary } from './types';

export interface WeeklySummaryInput {
  userName: string;
  activities: any[];
  metrics: any;
  previousSummary?: string;
}

export async function generateWeeklySummary(input: WeeklySummaryInput) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS.WEEKLY_SUMMARY },
    { 
      role: 'user', 
      content: `Generate a weekly summary for ${input.userName} based on the following data:
      Activities: ${JSON.stringify(input.activities)}
      Metrics: ${JSON.stringify(input.metrics)}
      ${input.previousSummary ? `Previous Summary context: ${input.previousSummary}` : ''}
      
      Format the response according to this schema:
      ${JSON.stringify(OUTPUT_SCHEMAS.WEEKLY_SUMMARY, null, 2)}`
    },
  ];

  const result = await getAICompletion<WeeklySummary>(messages);
  return result;
}
