'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { tasks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, AlertTriangle } from 'lucide-react';

interface PendingTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const pendingTasks = tasks.filter(task => task.status === 'Pending');

const statusStyles: { [key: string]: string } = {
    'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};


export function PendingTasksDialog({ isOpen, onClose }: PendingTasksDialogProps) {
  // Let's say tasks with "urgent" in the description are urgent
  const urgentCount = pendingTasks.filter(t => t.description.toLowerCase().includes('urgent')).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Clock className="text-primary" />
            Pending Tasks
          </DialogTitle>
          <DialogDescription>
            A list of all tasks that are currently pending. {urgentCount > 0 && <span className="text-destructive font-medium">{urgentCount} are marked urgent.</span>}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-6">
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex flex-col gap-2 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-base">{task.title}</p>
                    <Badge variant="outline" className={statusStyles[task.status]}>Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Due on: {task.dueDate}</span>
                    </div>
                  </div>
                   <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                   {task.description.toLowerCase().includes('urgent') && (
                        <div className="flex items-center gap-2 text-xs text-destructive mt-1">
                            <AlertTriangle className="h-4 w-4" />
                            <span>This task is marked as urgent.</span>
                        </div>
                    )}
                </div>
              ))}
              {pendingTasks.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No pending tasks.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
