import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const AI_MODEL = 'gpt-4o-mini';

export interface AIResult<T> {
  data: T;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  latency: number;
}

/**
 * Standardized completion wrapper with error handling and usage tracking
 */
export async function getAICompletion<T>(
  messages: any[],
  schema?: any
): Promise<AIResult<T>> {
  const start = Date.now();
  
  try {
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages,
      response_format: { type: 'json_object' },
    });

    const end = Date.now();
    const content = response.choices[0].message.content;
    
    if (!content) {
      throw new Error('AI returned empty content');
    }

    return {
      data: JSON.parse(content) as T,
      usage: {
        prompt_tokens: response.usage?.prompt_tokens || 0,
        completion_tokens: response.usage?.completion_tokens || 0,
        total_tokens: response.usage?.total_tokens || 0,
      },
      latency: end - start,
    };
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    
    // Handle specific error types if needed (e.g. rate limit)
    if (error.status === 429) {
      throw new Error('AI service is temporarily overloaded. Please try again in a moment.');
    }
    
    throw new Error(`AI Generation failed: ${error.message}`);
  }
}
