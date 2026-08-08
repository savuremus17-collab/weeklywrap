import { getAICompletion } from './openai';
import { SYSTEM_PROMPTS, OUTPUT_SCHEMAS } from './prompts';
import { ProductivityInsights } from './types';

export interface ProductivityInput {
  workSessionData: any;
  taskStats: any;
  userGoals: string[];
}

export async function generateProductivityInsights(input: ProductivityInput) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS.PRODUCTIVITY_INSIGHTS },
    { 
      role: 'user', 
      content: `Analyze productivity for the following data:
      Work Sessions: ${JSON.stringify(input.workSessionData)}
      Task Stats: ${JSON.stringify(input.taskStats)}
      User Goals: ${JSON.stringify(input.userGoals)}
      
      Format the response according to this schema:
      ${JSON.stringify(OUTPUT_SCHEMAS.PRODUCTIVITY_INSIGHTS, null, 2)}`
    },
  ];

  const result = await getAICompletion<ProductivityInsights>(messages);
  return result;
}
