'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const assessmentCriteria = [
    { id: 'quality', label: 'Quality of Work' },
    { id: 'timeliness', label: 'Timeliness & Punctuality' },
    { id: 'communication', label: 'Communication Skills' },
    { id: 'collaboration', label: 'Team Collaboration' },
    { id: 'initiative', label: 'Initiative & Proactiveness' },
];

export default function PerformancePage() {
    const { toast } = useToast();
    const [ratings, setRatings] = useState<Record<string, number>>({
        quality: 5,
        timeliness: 5,
        communication: 5,
        collaboration: 5,
        initiative: 5,
    });
    const [selfComments, setSelfComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(leaderboard[0].name);
    const [managerFeedback, setManagerFeedback] = useState('');

    const handleRatingChange = (id: string, value: number[]) => {
        setRatings(prev => ({ ...prev, [id]: value[0] }));
    };
    
    const handleSelfSubmit = () => {
        toast({
            title: 'Self-Assessment Submitted',
            description: 'Your performance review has been recorded.',
        });
    };

    const handleManagerSubmit = () => {
        toast({
            title: 'Feedback Submitted',
            description: `Your feedback for ${selectedEmployee} has been saved.`,
        });
    }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Performance Review
      </h1>
      <Tabs defaultValue="self-assessment">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="self-assessment">Self-Assessment</TabsTrigger>
          <TabsTrigger value="team-feedback">Team Feedback</TabsTrigger>
        </TabsList>
        <TabsContent value="self-assessment">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Performance Review</CardTitle>
                    <CardDescription>Rate yourself on the following criteria from 1 (Needs Improvement) to 10 (Excellent).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {assessmentCriteria.map(criterion => (
                        <div key={criterion.id} className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor={criterion.id}>{criterion.label}</Label>
                                <span className="w-12 rounded-md bg-primary/10 px-2 py-1 text-center text-sm font-medium text-primary">
                                    {ratings[criterion.id]}
                                </span>
                            </div>
                            <Slider 
                                id={criterion.id}
                                min={1}
                                max={10} 
                                step={1} 
                                value={[ratings[criterion.id]]}
                                onValueChange={(value) => handleRatingChange(criterion.id, value)}
                            />
                        </div>
                    ))}
                    <div className="grid gap-2">
                        <Label htmlFor="self-comments">Additional Comments</Label>
                        <Textarea 
                            id="self-comments" 
                            placeholder="Share your accomplishments, challenges, and goals for the next quarter."
                            value={selfComments}
                            onChange={(e) => setSelfComments(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSelfSubmit}>Submit Self-Assessment</Button>
                </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="team-feedback">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Provide Team Feedback</CardTitle>
                    <CardDescription>Select a team member to provide your feedback.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="employee-select">Team Member</Label>
                        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                            <SelectTrigger id="employee-select">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {leaderboard.map(user => (
                                <SelectItem key={user.name} value={user.name}>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            {user.avatar && <AvatarImage src={user.avatar} />}
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{user.name}</span>
                                    </div>
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="manager-feedback">Feedback</Label>
                        <Textarea 
                            id="manager-feedback" 
                            placeholder={`Provide constructive feedback for ${selectedEmployee}...`}
                            rows={8}
                            value={managerFeedback}
                            onChange={(e) => setManagerFeedback(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleManagerSubmit}>Submit Feedback</Button>
                </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
