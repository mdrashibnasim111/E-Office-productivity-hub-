
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateGoalDialog } from '@/components/dashboard/create-goal-dialog';

export default function GoalsPage() {
  const router = useRouter();
  const [isCreateGoalOpen, setIsCreateGoalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background/80 p-4 -mx-4 -mt-4 mb-4 border-b border-border backdrop-blur-sm lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold text-center flex-1 text-card-foreground">Goals &amp; KPIs</h1>
        <Button variant="ghost" size="icon" onClick={() => setIsCreateGoalOpen(true)}>
          <Plus />
        </Button>
      </header>

      <div className="hidden lg:flex justify-between items-start mb-6">
        <div>
            <h2 className="text-3xl font-bold text-card-foreground">Goals and KPIs</h2>
            <p className="text-muted-foreground mt-1">Set and track team and individual goals to enhance productivity and performance.</p>
        </div>
        <Button className="mt-4" onClick={() => setIsCreateGoalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Goal
        </Button>
      </div>
      
      <main className="space-y-6">
        <section className="bg-card p-6 rounded-xl shadow-sm">
          <h2 className="text-base font-semibold text-muted-foreground mb-4">Overall Goal Progress</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-border"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                ></path>
                <path
                  className="text-primary"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-card-foreground">75%</span>
                <span className="text-sm font-medium text-muted-foreground">Completed</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 text-card-foreground">Upcoming Deadlines</h2>
          <div className="space-y-3">
            <div className="bg-card p-4 rounded-lg flex items-center justify-between shadow-sm">
              <div>
                <p className="font-semibold text-foreground">Budget Report Q3</p>
                <p className="text-sm text-muted-foreground">Finance Department</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-yellow-500">3 days left</p>
                <p className="text-xs text-muted-foreground">Aug 15, 2024</p>
              </div>
            </div>
            <div className="bg-card p-4 rounded-lg flex items-center justify-between shadow-sm">
              <div>
                <p className="font-semibold text-foreground">Infrastructure Bill Draft</p>
                <p className="text-sm text-muted-foreground">Public Works</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">14 days left</p>
                <p className="text-xs text-muted-foreground">Aug 26, 2024</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-card p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-card-foreground">Team Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">Tasks Completed</span>
                <span className="text-lg font-bold text-sky-500">128</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">On-time Completion</span>
                <span className="text-lg font-bold text-primary">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">Active Projects</span>
                <span className="text-lg font-bold text-yellow-500">5</span>
              </div>
            </div>
          </section>
          <section className="bg-card p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-card-foreground">Individual Performance</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">Your Tasks Done</span>
                <span className="text-lg font-bold text-sky-500">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">Avg. Completion Time</span>
                <span className="text-lg font-bold text-primary">2.5 Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-foreground">Achievements</span>
                <span className="text-lg font-bold text-yellow-500">3</span>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-card p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-bold mb-4 text-card-foreground">Organization Performance</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">Citizen Satisfaction</span>
                <span className="font-semibold text-primary">4.2/5</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">Process Efficiency</span>
                <span className="font-semibold text-sky-500">-5% Time</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CreateGoalDialog isOpen={isCreateGoalOpen} onClose={() => setIsCreateGoalOpen(false)} />
    </>
  );
}

    