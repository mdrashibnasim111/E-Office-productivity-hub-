'use server';

/**
 * @fileOverview A flow that generates productivity recommendations for a team based on KPIs and organizational context.
 *
 * - generateProductivityRecommendations - A function that generates productivity recommendations.
 * - GenerateProductivityRecommendationsInput - The input type for the generateProductivityRecommendations function.
 * - GenerateProductivityRecommendationsOutput - The return type for the generateProductivityRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductivityRecommendationsInputSchema = z.object({
  teamKPIs: z
    .string()
    .describe('The Key Performance Indicators (KPIs) for the team.'),
  organizationalContext: z
    .string()
    .describe(
      'The organizational context, including goals, objectives, and current initiatives.'
    ),
});
export type GenerateProductivityRecommendationsInput = z.infer<
  typeof GenerateProductivityRecommendationsInputSchema
>;

const GenerateProductivityRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'AI-driven recommendations on how the team can improve productivity.'
    ),
});
export type GenerateProductivityRecommendationsOutput = z.infer<
  typeof GenerateProductivityRecommendationsOutputSchema
>;

export async function generateProductivityRecommendations(
  input: GenerateProductivityRecommendationsInput
): Promise<GenerateProductivityRecommendationsOutput> {
  return generateProductivityRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductivityRecommendationsPrompt',
  input: {schema: GenerateProductivityRecommendationsInputSchema},
  output: {schema: GenerateProductivityRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide productivity recommendations for teams within government offices.

  Based on the team's KPIs and the organizational context, provide actionable recommendations on how the team can improve its productivity.

  Team KPIs: {{{teamKPIs}}}
  Organizational Context: {{{organizationalContext}}}

  Provide clear and concise recommendations that the manager can implement immediately.  The recommendations should directly help the team meet its KPIs and align with the organizational context.
`,
});

const generateProductivityRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateProductivityRecommendationsFlow',
    inputSchema: GenerateProductivityRecommendationsInputSchema,
    outputSchema: GenerateProductivityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
