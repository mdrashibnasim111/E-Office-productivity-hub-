
'use client';

import { Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export function StreaksCard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userStreakRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'userStreaks', user.uid) : null),
    [firestore, user]
  );
  
  const { data: streakData, isLoading: isStreakLoading } = useDoc(userStreakRef);
  
  const isLoading = isUserLoading || (user && isStreakLoading);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-sm font-medium">
          <Flame className="text-accent" />
          Engagement Streaks
        </CardTitle>
        <CardDescription className="sr-only">
            Your daily activity streak. Keep it up!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around items-center text-center pt-6">
        {isLoading ? (
            <>
                <div className="space-y-2"><Skeleton className="h-8 w-16" /><Skeleton className="h-4 w-20" /></div>
                <div className="space-y-2"><Skeleton className="h-8 w-16" /><Skeleton className="h-4 w-24" /></div>
            </>
        ) : (
          <>
            <div>
              <div className="text-3xl font-bold font-headline text-accent flex items-center justify-center gap-1">
                {streakData?.currentStreak ?? 0} <Flame size={28} className="text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </div>
            <div>
              <div className="text-3xl font-bold font-headline text-accent">
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
