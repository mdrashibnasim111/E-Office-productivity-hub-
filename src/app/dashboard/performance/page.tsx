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
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { savePerformanceReview } from '@/firebase/firestore/mutations';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const assessmentCriteria = [
    { id: 'quality', label: 'Quality of Work' },
    { id: 'timeliness', label: 'Timeliness & Punctuality' },
    { id: 'communication', label: 'Communication Skills' },
    { id: 'collaboration', label: 'Team Collaboration' },
    { id: 'initiative', label: 'Initiative & Proactiveness' },
];

export default function PerformancePage() {
    const { toast } = useToast();
    const { user } = useUser();
    const firestore = useFirestore();
    const [ratings, setRatings] = useState<Record<string, number>>({
        quality: 5,
        timeliness: 5,
        communication: 5,
        collaboration: 5,
        initiative: 5,
    });
    const [selfComments, setSelfComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(leaderboard[0]?.id || '');
    const [managerFeedback, setManagerFeedback] = useState('');

    const selfReviewsQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'performanceReviews'),
            where('userId', '==', user.uid),
            where('type', '==', 'self-assessment')
        );
    }, [firestore, user?.uid]);

    const { data: selfReviews, isLoading: isLoadingSelfReviews } = useCollection(selfReviewsQuery);

    const managerReviewsQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) return null;
        return query(
            collection(firestore, 'performanceReviews'),
            where('reviewerId', '==', user.uid),
            where('type', '==', 'manager-feedback')
        );
    }, [firestore, user?.uid]);

    const { data: managerReviews, isLoading: isLoadingManagerReviews } = useCollection(managerReviewsQuery);

    const handleRatingChange = (id: string, value: number[]) => {
        setRatings(prev => ({ ...prev, [id]: value[0] }));
    };
    
    const handleSelfSubmit = () => {
        if (!user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to submit a review.',
            });
            return;
        }

        const reviewData = {
            type: 'self-assessment' as const,
            ratings,
            comments: selfComments,
        };

        savePerformanceReview(firestore, user.uid, reviewData);

        toast({
            title: 'Success',
            description: 'Self assessment submitted successfully.',
        });
        setSelfComments('');
        setRatings({
            quality: 5,
            timeliness: 5,
            communication: 5,
            collaboration: 5,
            initiative: 5,
        });
    };

    const handleManagerSubmit = () => {
        if (!user || !firestore) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to submit feedback.',
            });
            return;
        }
        
        const employee = leaderboard.find(e => e.id === selectedEmployee);
        if (!employee) {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not find the selected employee.',
            });
            return;
        }

        const reviewData = {
            type: 'manager-feedback' as const,
            feedback: managerFeedback,
            reviewedUserId: selectedEmployee,
        };

        // The savePerformanceReview function will handle associating the manager's ID.
        savePerformanceReview(firestore, user.uid, reviewData);
        
        toast({
            title: 'Feedback Submitted',
            description: `Your feedback for ${employee.name} has been saved.`,
        });
        setManagerFeedback('');
    }

    const getEmployeeName = (userId: string) => {
        return leaderboard.find(e => e.id === userId)?.name || 'Unknown Employee';
    }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline text-accent">
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

            <div className="mt-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Submitted Assessments</h2>
                {isLoadingSelfReviews ? (
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : selfReviews && selfReviews.length > 0 ? (
                    <div className="space-y-4">
                        {selfReviews.map(review => (
                            <Card key={review.id}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline">
                                        Self-Assessment from {review.createdAt?.toDate ? new Date(review.createdAt.toDate()).toLocaleDateString() : 'Invalid Date'}
                                    </CardTitle>
                                     <CardDescription>
                                        Submitted by {user?.displayName || user?.email}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold">Ratings:</h4>
                                            <ul className="list-disc list-inside text-muted-foreground">
                                                {review.ratings && Object.entries(review.ratings).map(([key, value]) => (
                                                    <li key={key} className="capitalize">{key}: {value}/10</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Comments:</h4>
                                            <p className="text-muted-foreground">{review.comments || 'No comments provided.'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">You have not submitted any self-assessments yet.</p>
                )}
            </div>

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
                                <SelectItem key={user.id} value={user.id}>
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
                            placeholder={`Provide constructive feedback for ${leaderboard.find(e => e.id === selectedEmployee)?.name}...`}
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

            <div className="mt-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Submitted Feedback</h2>
                {isLoadingManagerReviews ? (
                     <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : managerReviews && managerReviews.length > 0 ? (
                    <div className="space-y-4">
                        {managerReviews.map(review => (
                            <Card key={review.id}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-headline">
                                        Feedback for {getEmployeeName(review.userId)}
                                    </CardTitle>
                                    <CardDescription>
                                        Submitted on {review.createdAt?.toDate ? new Date(review.createdAt.toDate()).toLocaleDateString() : 'Invalid Date'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{review.feedback}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground">You have not submitted any manager feedback yet.</p>
                )}
            </div>

        </TabsContent>
      </Tabs>
    </>
  );
}
