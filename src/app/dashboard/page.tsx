'use client';

import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { Recommendations } from "@/components/dashboard/recommendations";
import { OfflineSummary } from "@/components/dashboard/offline-summary";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Welcome to your Dashboard
      </h1>
      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
            <ProductivityChart />
        </div>
        <Leaderboard />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <TasksTable />
      </div>
       <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Recommendations />
        <OfflineSummary />
      </div>
    </>
  );
}
