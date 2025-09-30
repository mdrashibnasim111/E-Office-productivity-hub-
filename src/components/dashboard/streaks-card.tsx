'use client';

import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUser, useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export function StreaksCard() {
  const { user, isUserLoading } = useUser();
  const firestore = getFirestore();

  const userStreakRef = useMemoFirebase(
    () => (user ? doc(firestore, 'userStreaks', user.uid) : null),
    [firestore, user]
  );
  
  // For now, we'll use mock data. Once the backend functions are implemented
  // this useDoc hook will fetch the real data.
  // const { data: streakData, isLoading: isStreakLoading } = useDoc(userStreakRef);
  const streakData = { currentStreak: 5, longestStreak: 12 };
  const isStreakLoading = false;


  const isLoading = isUserLoading || isStreakLoading;

  return (
    <Card className="shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Flame className="text-accent" />
          Engagement Streaks
        </CardTitle>
        <CardDescription>
            Your daily activity streak. Keep it up!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around items-center text-center">
        {isLoading ? (
            <>
                <div className="space-y-2"><Skeleton className="h-8 w-16" /><Skeleton className="h-4 w-20" /></div>
                <div className="space-y-2"><Skeleton className="h-8 w-16" /><Skeleton className="h-4 w-24" /></div>
            </>
        ) : (
          <>
            <div>
              <div className="text-3xl font-bold font-headline text-primary flex items-center justify-center gap-1">
                {streakData?.currentStreak ?? 0} <Flame size={28} />
              </div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div>
              <div className="text-3xl font-bold font-headline text-primary">
                {streakData?.longestStreak ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
