import OpenAI from 'openai';

let _openai: OpenAI | null = null;

// Lazily create the client the first time it's actually needed, instead of
// throwing at module-import time. Importing this file for other exports
// (types, AI_MODEL, etc.) should never crash a build/route just because the
// key isn't configured yet — only calls to getAICompletion() should fail.
function getClient(): OpenAI {
  if (!_openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY environment variable');
    }
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

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
    const response = await getClient().chat.completions.create({
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
