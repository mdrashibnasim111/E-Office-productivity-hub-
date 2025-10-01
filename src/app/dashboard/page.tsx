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
        Welcome, Rashib
      </h1>
      
      {/* Top Row: Streaks and Stats */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
        <div className="lg:col-span-1">
          <StreaksCard />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3 xl:grid-cols-4">
          <StatsCards />
        </div>
      </div>
      
      {/* Middle Row: Chart and Leaderboard */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-2">
            <ProductivityChart />
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      {/* Full-width Row: Tasks Table */}
      <div className="grid grid-cols-1 gap-4 lg:gap-6">
        <TasksTable />
      </div>

      {/* Bottom Row: AI tools */}
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <Recommendations />
        <OfflineSummary />
      </div>
    </>
  );
}
