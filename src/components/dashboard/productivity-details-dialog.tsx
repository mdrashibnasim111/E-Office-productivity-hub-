'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { tasks, Task } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users } from 'lucide-react';

interface ProductivityDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const completedTasks = tasks.filter(task => task.status === 'Completed');

export function ProductivityDetailsDialog({ isOpen, onClose }: ProductivityDetailsDialogProps) {
  
  // Dummy calculations for demonstration
  const totalTimeSpent = completedTasks.length * 4.5; // e.g., 4.5 hours per task
  const teamMembers = [...new Set(completedTasks.map(t => t.assignee))];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Overall Productivity Details</DialogTitle>
          <DialogDescription>
            A breakdown of the factors contributing to the 85% productivity score.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-6">
            <div className="space-y-6">

              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                    <CheckCircle className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold font-headline">{completedTasks.length}</p>
                    <p className="text-xs text-muted-foreground">Tasks Completed</p>
                </div>
                 <div className="p-4 rounded-lg bg-muted/50">
                    <Clock className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold font-headline">{totalTimeSpent.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Hours Logged</p>
                </div>
                 <div className="p-4 rounded-lg bg-muted/50">
                    <Users className="h-6 w-6 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold font-headline">{teamMembers.length}</p>
                    <p className="text-xs text-muted-foreground">Contributors</p>
                </div>
              </div>
              
              <Separator />

              {/* Task List */}
              <div>
                <h3 className="font-semibold mb-4">Completed Task Contributions</h3>
                <div className="space-y-3">
                  {completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Completed by {task.assignee} on {task.dueDate}
                        </p>
                      </div>
                      <div className="ml-4">
                        {/* Dummy time for example */}
                        <Badge variant="secondary">~4.5 hrs</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
