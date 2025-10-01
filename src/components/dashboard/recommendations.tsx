"use client";

import { useState } from "react";
import { generateProductivityRecommendations, GenerateProductivityRecommendationsInput } from "@/ai/flows/generate-productivity-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Loader2 } from "lucide-react";
import ElectricBorder from "@/components/ui/electric-border";

export function Recommendations() {
  const [kpis, setKpis] = useState("");
  const [context, setContext] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!kpis || !context) {
        toast({
            title: "Missing Information",
            description: "Please provide both Team KPIs and Organizational Context.",
            variant: "destructive",
        });
        return;
    }

    setIsLoading(true);
    setRecommendations("");
    try {
        const input: GenerateProductivityRecommendationsInput = {
            teamKPIs: kpis,
            organizationalContext: context,
        };
        const result = await generateProductivityRecommendations(input);
        setRecommendations(result.recommendations);
    } catch (error) {
        console.error("Failed to generate recommendations:", error);
        toast({
            title: "Generation Failed",
            description: "Could not generate recommendations. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-accent"/>
            AI Productivity Recommendations
        </CardTitle>
        <CardDescription>
          Get AI-driven advice to boost your team's performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="kpis">Team KPIs</Label>
          <ElectricBorder color="hsl(var(--primary))" className="rounded-lg">
            <Textarea 
              placeholder="e.g., Reduce average task completion time by 15%, Increase citizen satisfaction score to 95%" 
              id="kpis"
              value={kpis}
              onChange={(e) => setKpis(e.target.value)}
              className="bg-transparent"
              />
          </ElectricBorder>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="context">Organizational Context</Label>
          <ElectricBorder color="hsl(var(--primary))" className="rounded-lg">
            <Textarea 
              placeholder="e.g., Currently undergoing a digital transformation initiative to improve public service delivery." 
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="bg-transparent"
            />
          </ElectricBorder>
        </div>
        {recommendations && (
            <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{recommendations}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
          </> : 'Generate Recommendations'}
        </Button>
      </CardFooter>
    </Card>
  );
}
