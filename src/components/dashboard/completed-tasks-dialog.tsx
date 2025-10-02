'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { tasks, Task } from '@/lib/data';
import { CheckCircle, User, Calendar } from 'lucide-react';
import AnimatedList from '@/components/ui/animated-list';
import { Badge } from '../ui/badge';

interface CompletedTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const completedTasks = tasks.filter(task => task.status === 'Completed');

export function CompletedTasksDialog({ isOpen, onClose }: CompletedTasksDialogProps) {
  const renderItem = (task: Task) => (
    <div className="flex flex-col gap-2 p-4 rounded-lg border bg-card/80 hover:bg-muted/50 transition-colors w-full">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-base">{task.title}</p>
        <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <User className="h-3 w-3" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>Completed on: {task.dueDate}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <CheckCircle className="text-accent" />
            Completed Tasks
          </DialogTitle>
          <DialogDescription>
            A list of all tasks that have been successfully completed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden relative">
          {completedTasks.length > 0 ? (
            <AnimatedList<Task>
              items={completedTasks}
              renderItem={renderItem}
              onItemSelect={(item) => console.log('Selected:', item.title)}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
              className="h-full"
            />
          ) : (
             <div className="text-center py-10">
                <p className="text-muted-foreground">No completed tasks yet.</p>
              </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
