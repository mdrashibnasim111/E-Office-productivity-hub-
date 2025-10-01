'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard, LeaderboardUser } from '@/lib/data';
import { Badges } from '@/components/dashboard/badges';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { tasks } from '@/lib/data';
import { productivityData } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

// This component now manages its own client-side state for the stats
const TeamMemberCard = ({ user }: { user: LeaderboardUser }) => {
  const [stats, setStats] = useState<{ completedTasks: number; productivity: string } | null>(null);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted
    const completedTasks = tasks.filter(task => task.assignee === user.name && task.status === 'Completed').length;
    // The random calculation is now safely on the client
    const userProd = productivityData[productivityData.length - 1].score - (Math.random() * 10);
    setStats({
      completedTasks,
      productivity: userProd.toFixed(0),
    });
  }, [user.name]);

  return (
    <div
      className="relative flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-card"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
            <Info className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {stats ? (
            <div className="text-sm">
              <p><span className="font-semibold">Completed Tasks:</span> {stats.completedTasks}</p>
              <p><span className="font-semibold">Productivity Score:</span> {stats.productivity}%</p>
            </div>
          ) : (
             <div className="text-sm">Loading...</div>
          )}
        </TooltipContent>
      </Tooltip>

      <Avatar className="h-20 w-20">
        {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.title}</p>
      </div>
      <Badges badges={user.badges} />
    </div>
  );
};


export default function TeamPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Team Members
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Team</CardTitle>
          <CardDescription>
            An overview of the members in your team.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <TooltipProvider>
            {leaderboard.map((user) => (
                <TeamMemberCard key={user.id} user={user} />
            ))}
          </TooltipProvider>
        </CardContent>
      </Card>
    </>
  );
}
