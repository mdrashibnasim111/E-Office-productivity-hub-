
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projectProgressData = [
  { name: 'Project A', progress: 50 },
  { name: 'Project B', progress: 100 },
  { name: 'Project C', progress: 60 },
];

const employeeCompletionData = [
    { name: 'Employee 1', completion: 80 },
    { name: 'Employee 2', completion: 30 },
    { name: 'Employee 3', completion: 90 },
];

const employeePerformance = [
    { name: 'Employee 1', details: 'Project A: 90%, Project B: 80%', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl },
    { name: 'Employee 2', details: 'Project A: 75%, Project C: 85%', avatar: PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl },
    { name: 'Employee 3', details: 'Project B: 95%, Project C: 70%', avatar: PlaceHolderImages.find(p => p.id === 'avatar-3')?.imageUrl },
]

export default function DashboardPage() {
  return (
    <main className="p-0 m-0">
        <section className="mb-6">
            <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
                <input className="w-full rounded-lg border-border-divider bg-card py-3 pl-10 pr-4 text-text-primary placeholder:text-secondary focus:border-primary focus:ring-primary" placeholder="Search teams, projects, employees..." type="text"/>
            </div>
        </section>

        <section className="mb-6">
            <h2 className="text-xl font-bold text-text-heading mb-4">Team Performance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4 shadow">
                    <p className="text-sm font-medium text-text-secondary">Overall Score</p>
                    <p className="text-3xl font-bold text-success">85%</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4 shadow">
                    <p className="text-sm font-medium text-text-secondary">Projects Completed</p>
                    <p className="text-3xl font-bold text-success">12</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4 shadow col-span-2 sm:col-span-1">
                    <p className="text-sm font-medium text-text-secondary">Tasks Delayed</p>
                    <p className="text-3xl font-bold text-error">3</p>
                </div>
            </div>
        </section>

        <section className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border border-border-divider bg-card p-4 shadow">
                    <h3 className="text-base font-medium text-text-heading mb-4">Project Progress</h3>
                     <div className="grid grid-flow-col gap-6 grid-rows-[1fr_auto] items-end justify-items-center h-48 px-3">
                        <div className="w-full bg-border-divider rounded-t-lg">
                            <div className="bg-success rounded-t-lg" style={{height: "50%"}}></div>
                        </div>
                        <p className="text-xs font-bold text-text-secondary">Project A</p>
                        <div className="w-full bg-border-divider rounded-t-lg">
                            <div className="bg-success rounded-t-lg" style={{height: "100%"}}></div>
                        </div>
                        <p className="text-xs font-bold text-text-secondary">Project B</p>
                        <div className="w-full bg-border-divider rounded-t-lg">
                            <div className="bg-success rounded-t-lg" style={{height: "60%"}}></div>
                        </div>
                        <p className="text-xs font-bold text-text-secondary">Project C</p>
                    </div>
                </div>
                <div className="rounded-lg border border-border-divider bg-card p-4 shadow">
                    <h3 className="text-base font-medium text-text-heading mb-4">Task Completion by Employee</h3>
                    <div className="grid gap-y-4 py-3">
                        {employeeCompletionData.map(emp => (
                            <div key={emp.name}>
                                <p className="text-xs font-bold text-text-secondary mb-1">{emp.name}</p>
                                <div className="h-2.5 w-full rounded-full bg-border-divider">
                                    <div className="h-2.5 rounded-full bg-success" style={{ width: `${emp.completion}%`}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2 className="text-xl font-bold text-text-heading mb-4">Employee Performance Summary</h2>
            <div className="space-y-2">
                {employeePerformance.map(emp => (
                    <div key={emp.name} className="flex items-center gap-4 rounded-lg bg-card p-3 shadow">
                        <img alt={emp.name} className="h-12 w-12 rounded-full object-cover" src={emp.avatar}/>
                        <div className="flex-1">
                            <p className="text-base font-medium text-text-primary line-clamp-1">{emp.name}</p>
                            <p className="text-sm text-text-secondary line-clamp-2">{emp.details}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </main>
  );
}
