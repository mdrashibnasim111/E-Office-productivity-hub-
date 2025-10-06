
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { teamGoals, Goal, tasks, Task } from '@/lib/data';
import { Users, Target, Calendar, ListChecks, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TeamPerformanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusStyles: { [key: string]: string } = {
  'In Progress': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const teams = [...new Set(tasks.map(task => task.team))];

const TeamSection = ({ team }: { team: string }) => {
    const teamTasks = tasks.filter(t => t.team === team);
    const completedTasks = teamTasks.filter(t => t.status === 'Completed').length;
    const onTimeCompletion = (completedTasks / (teamTasks.length || 1)) * 100;
    const teamSpecificGoals = teamGoals.filter(g => g.title.toLowerCase().includes(team.toLowerCase()));

    return (
        <div className="mb-6 rounded-lg border p-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Users className="h-5 w-5" />
                {team}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><ListChecks className="h-4 w-4" /> Tasks Completed</p>
                    <p className="text-2xl font-bold">{completedTasks}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> On-time Completion</p>
                    <p className="text-2xl font-bold">{onTimeCompletion.toFixed(0)}%</p>
                </div>
            </div>
            
            {teamSpecificGoals.length > 0 && (
                <div>
                    <h4 className="font-semibold text-md mb-2">Team Goals</h4>
                    <div className="space-y-3">
                        {teamSpecificGoals.map(goal => (
                            <div key={goal.id} className="bg-card p-3 rounded-md border">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium flex-1 pr-2">{goal.title}</p>
                                    <div className="text-right">
                                        <div className="font-bold">{goal.progress}%</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                                            <Calendar className="h-3 w-3" />
                                            <span>{goal.deadline}</span>
                                        </div>
                                    </div>
                                </div>
                                <Progress value={goal.progress} className="h-1 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export function TeamPerformanceDialog({ isOpen, onClose }: TeamPerformanceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Users className="text-accent" />
            Team Performance Details
          </DialogTitle>
          <DialogDescription>
            An overview of each team's performance metrics and goals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-6">
            {teams.map(team => (
                <TeamSection key={team} team={team} />
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
