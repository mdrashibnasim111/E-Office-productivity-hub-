
'use client';

import { TasksTable } from "@/components/dashboard/tasks-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks } from "@/lib/data";

const teamTasks = tasks.filter(task => task.assignee !== 'Sarah Lee'); // Example filter for team
const myTasks = tasks.filter(task => task.assignee === 'Sarah Lee'); // Example filter for user

export default function TasksPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Tasks
      </h1>
       <Tabs defaultValue="team">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="team">Team Tasks</TabsTrigger>
          <TabsTrigger value="individual-tasks">Individual Tasks</TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <TasksTable tasks={teamTasks} caption="A list of tasks assigned to your team." />
        </TabsContent>
        <TabsContent value="individual-tasks">
          <TasksTable tasks={myTasks} caption="A list of tasks assigned to you." />
        </TabsContent>
      </Tabs>
    </>
  );
}
