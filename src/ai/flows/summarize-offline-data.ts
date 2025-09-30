'use server';

/**
 * @fileOverview Summarizes offline data collected by field officers and provides key insights.
 *
 * - summarizeOfflineData - A function that handles the summarization process.
 * - SummarizeOfflineDataInput - The input type for the summarizeOfflineData function.
 * - SummarizeOfflineDataOutput - The return type for the summarizeOfflineData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeOfflineDataInputSchema = z.object({
  offlineData: z.string().describe('The offline data collected by the field officer.'),
});
export type SummarizeOfflineDataInput = z.infer<typeof SummarizeOfflineDataInputSchema>;

const SummarizeOfflineDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the offline data with key insights.'),
});
export type SummarizeOfflineDataOutput = z.infer<typeof SummarizeOfflineDataOutputSchema>;

export async function summarizeOfflineData(input: SummarizeOfflineDataInput): Promise<SummarizeOfflineDataOutput> {
  return summarizeOfflineDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeOfflineDataPrompt',
  input: {schema: SummarizeOfflineDataInputSchema},
  output: {schema: SummarizeOfflineDataOutputSchema},
  prompt: `You are an AI assistant that helps field officers summarize their offline data and provide key insights.
  Summarize the following offline data and provide key insights:
  {{offlineData}}`,
});

const summarizeOfflineDataFlow = ai.defineFlow(
  {
    name: 'summarizeOfflineDataFlow',
    inputSchema: SummarizeOfflineDataInputSchema,
    outputSchema: SummarizeOfflineDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
