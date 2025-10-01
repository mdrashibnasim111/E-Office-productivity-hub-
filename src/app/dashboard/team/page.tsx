'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';
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

// Helper function to get user stats
const getUserStats = (userName: string) => {
    const completedTasks = tasks.filter(task => task.assignee === userName && task.status === 'Completed').length;
    // For demonstration, let's assign some productivity score. In a real app, this would be calculated.
    const userProd = productivityData[productivityData.length - 1].score - (Math.random() * 10);
    return {
        completedTasks,
        productivity: userProd.toFixed(0)
    };
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
            {leaderboard.map((user) => {
              const stats = getUserStats(user.name);
              return (
                <div
                  key={user.name}
                  className="relative flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-card"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm">
                        <p><span className="font-semibold">Completed Tasks:</span> {stats.completedTasks}</p>
                        <p><span className="font-semibold">Productivity Score:</span> {stats.productivity}%</p>
                      </div>
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
            })}
          </TooltipProvider>
        </CardContent>
      </Card>
    </>
  );
}
