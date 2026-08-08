import { getAICompletion } from './openai';
import { SYSTEM_PROMPTS, OUTPUT_SCHEMAS } from './prompts';
import { CreatorAnalytics } from './types';

export interface CreatorAnalyticsInput {
  platform: string;
  creatorHandle: string;
  analyticsData: any;
  contentPieces: any[];
}

export async function generateCreatorAnalytics(input: CreatorAnalyticsInput) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS.CREATOR_ANALYTICS },
    { 
      role: 'user', 
      content: `Analyze creator analytics for ${input.creatorHandle} on ${input.platform}.
      Raw Analytics: ${JSON.stringify(input.analyticsData)}
      Recent Content: ${JSON.stringify(input.contentPieces)}
      
      Format the response according to this schema:
      ${JSON.stringify(OUTPUT_SCHEMAS.CREATOR_ANALYTICS, null, 2)}`
    },
  ];

  const result = await getAICompletion<CreatorAnalytics>(messages);
  return result;
}
