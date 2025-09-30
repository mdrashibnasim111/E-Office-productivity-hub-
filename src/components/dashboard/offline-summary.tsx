"use client";

import { useState } from "react";
import { summarizeOfflineData, SummarizeOfflineDataInput } from "@/ai/flows/summarize-offline-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { WifiOff, Loader2 } from "lucide-react";

export function OfflineSummary() {
  const [offlineNotes, setOfflineNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    if (!offlineNotes) {
        toast({
            title: "No Notes Provided",
            description: "Please enter some notes to summarize.",
            variant: "destructive",
        });
        return;
    }

    setIsLoading(true);
    setSummary("");
    try {
        const input: SummarizeOfflineDataInput = {
            offlineData: offlineNotes,
        };
        const result = await summarizeOfflineData(input);
        setSummary(result.summary);
    } catch (error) {
        console.error("Failed to generate summary:", error);
        toast({
            title: "Summarization Failed",
            description: "Could not generate summary. Please try again.",
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
            <WifiOff className="text-muted-foreground"/>
            Offline Data Summary
        </CardTitle>
        <CardDescription>
          For field officers. Paste your offline notes to get a quick summary.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="offline-notes">Field Notes</Label>
          <Textarea 
            placeholder="Paste your collected data here... e.g., 'Interviewed 10 residents in Ward 5. Common issues: poor road conditions (8/10), infrequent waste collection (6/10). Met with community leader, Mrs. Gupta, who suggested a neighborhood watch program.'" 
            id="offline-notes"
            rows={5}
            value={offlineNotes}
            onChange={(e) => setOfflineNotes(e.target.value)}
            />
        </div>
        {summary && (
            <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-2">Key Insights:</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary}</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateSummary} disabled={isLoading} variant="secondary">
          {isLoading ? <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...
          </> : 'Summarize Notes'}
        </Button>
      </CardFooter>
    </Card>
  );
}
