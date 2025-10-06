
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/lib/data';
import { TaskDetailsDialog } from '@/components/dashboard/task-details-dialog';
import { ChevronsRightLeft } from 'lucide-react';

const statusStyles: { [key: string]: string } = {
  'In Progress': 'bg-sky-500/20 text-sky-400 border-sky-500/30 shadow-sm shadow-sky-500/50',
  'Completed': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 shadow-sm shadow-emerald-500/50',
  'Pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-sm shadow-amber-500/50',
};

interface TasksTableProps {
    tasks: Task[];
    caption: string;
}

export function TasksTable({ tasks, caption }: TasksTableProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDialogClose = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="relative group">
             <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end">
                <ChevronsRightLeft className="h-6 w-6 text-muted-foreground animate-pulse mr-2" />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>{caption}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id} onClick={() => handleRowClick(task)} className="cursor-pointer">
                      <TableCell className="font-medium whitespace-nowrap">{task.id}</TableCell>
                      <TableCell className="min-w-[250px]">{task.title}</TableCell>
                      <TableCell className="whitespace-nowrap">{task.assignee}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[task.status]}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">{task.dueDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
}
