import { getAICompletion } from './openai';
import { SYSTEM_PROMPTS, OUTPUT_SCHEMAS } from './prompts';
import { ClientReport } from './types';

export interface ClientReportInput {
  clientName: string;
  projectDescription: string;
  tasksCompleted: any[];
  metrics: any;
  upcomingMilestones: string[];
}

export async function generateClientReport(input: ClientReportInput) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPTS.CLIENT_REPORT },
    { 
      role: 'user', 
      content: `Generate a client-ready report for ${input.clientName} for the project: ${input.projectDescription}.
      Completed Tasks: ${JSON.stringify(input.tasksCompleted)}
      Key Metrics: ${JSON.stringify(input.metrics)}
      Upcoming Milestones: ${JSON.stringify(input.upcomingMilestones)}
      
      Format the response according to this schema:
      ${JSON.stringify(OUTPUT_SCHEMAS.CLIENT_REPORT, null, 2)}`
    },
  ];

  const result = await getAICompletion<ClientReport>(messages);
  return result;
}
