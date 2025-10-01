'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { tasks, Task } from '@/lib/data';
import { TaskDetailsDialog } from '@/components/dashboard/task-details-dialog';
import { ChevronsRightLeft } from 'lucide-react';

const statusStyles: { [key: string]: string } = {
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export function TasksTable() {
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
        <CardHeader>
          <CardTitle className="font-headline">Recent Tasks</CardTitle>
          <CardDescription>
            A list of recently updated tasks in your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative group">
             <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-end">
                <ChevronsRightLeft className="h-6 w-6 text-muted-foreground animate-pulse mr-2" />
            </div>
            <div className="overflow-x-auto">
              <Table>
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
