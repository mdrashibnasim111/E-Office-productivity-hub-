'use client';

import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { Recommendations } from "@/components/dashboard/recommendations";
import { OfflineSummary } from "@/components/dashboard/offline-summary";
import { StreaksCard } from "@/components/dashboard/streaks-card";
import GradientText from "@/components/ui/gradient-text";
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  const isLoading = isUserLoading || isUserDocLoading;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="md:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
              {isLoading ? (
                <Skeleton className="h-10 w-64" />
              ) : (
                <GradientText>Welcome back, {userData?.fullName || 'User'}!</GradientText>
              )}
            </h1>
            <p className="text-muted-foreground">Let’s get productive.</p>
        </div>
        <div className="md:col-span-1">
            <StreaksCard />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatsCards />
      </div>
      
      {/* Middle Row: Chart and Leaderboard */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
            <ProductivityChart />
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      {/* Full-width Row: Tasks Table */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <TasksTable />
      </div>

      {/* Bottom Row: AI tools */}
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <Recommendations />
        <OfflineSummary />
      </div>
    </>
  );
}
