'use client';

import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { TasksTable } from "@/components/dashboard/tasks-table";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { Recommendations } from "@/components/dashboard/recommendations";
import { OfflineSummary } from "@/components/dashboard/offline-summary";
import { StreaksCard } from "@/components/dashboard/streaks-card";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Welcome to your Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 md:col-span-2">
            <StreaksCard />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:col-span-3">
            <StatsCards />
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <ProductivityChart />
        </div>
        <div className="space-y-4">
          <Leaderboard />
        </div>
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
