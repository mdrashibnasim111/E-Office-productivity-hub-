import { TasksTable } from "@/components/dashboard/tasks-table";

export default function TasksPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Tasks
      </h1>
       <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <TasksTable />
      </div>
    </>
  );
}
