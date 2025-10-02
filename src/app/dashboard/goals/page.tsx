
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";

const teamGoals = [
    {
        name: "Improve Citizen Service",
        owner: "Customer Service Team",
        status: "In Progress",
        dueDate: "2024-12-31",
        progress: 75,
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    {
        name: "Enhance Digital Accessibility",
        owner: "IT Department",
        status: "Completed",
        dueDate: "2024-06-30",
        progress: 100,
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
        name: "Streamline Internal Processes",
        owner: "Operations Team",
        status: "In Progress",
        dueDate: "2024-11-15",
        progress: 50,
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
];

const individualGoals = [
    {
        employee: "Ethan Carter",
        goal: "Complete Project Alpha",
        status: "Completed",
        dueDate: "2024-07-15",
        progress: 100,
        statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
        employee: "Olivia Bennett",
        goal: "Improve Response Time",
        status: "In Progress",
        dueDate: "2024-10-31",
        progress: 60,
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    {
        employee: "Noah Thompson",
        goal: "Reduce Backlog",
        status: "In Progress",
        dueDate: "2024-09-30",
        progress: 40,
        statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    {
        employee: "Ava Harper",
        goal: "Enhance Reporting Accuracy",
        status: "Not Started",
        dueDate: "2024-11-30",
        progress: 0,
        statusColor: "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300",
    },
]

export default function GoalsPage() {
  const router = useRouter();

  return (
    <>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
        </Button>
        <header className="flex flex-col items-start mb-8">
            <div>
            <h2 className="text-3xl font-bold text-card-foreground">Goals and KPIs</h2>
            <p className="text-muted-foreground mt-1">Set and track team and individual goals to enhance productivity and performance.</p>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2 mt-4">
            <span className="material-symbols-outlined">add</span>
            <span>Create New Goal</span>
            </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">trophy</span>
                    <span className="text-primary font-semibold">Overall Goal Progress</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-card-foreground">72%</span>
                    <span className="text-muted-foreground text-sm">completed</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                    <div className="bg-primary h-2 rounded-full" style={{width: "72%"}}></div>
                </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="material-symbols-outlined text-orange-500 text-2xl">event_upcoming</span>
                    <span className="text-orange-500 font-semibold">Upcoming Deadlines</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-card-foreground">5</span>
                    <span className="text-muted-foreground text-sm">goals due next 30 days</span>
                </div>
                <ul className="mt-4 text-sm text-muted-foreground w-full">
                    <li className="flex justify-between py-1 border-b border-border"><span>Improve Citizen Service</span><span className="font-medium">Dec 31</span></li>
                    <li className="flex justify-between py-1"><span>Streamline Internal Processes</span><span className="font-medium">Nov 15</span></li>
                </ul>
            </div>
            <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-4">
                    <span className="material-symbols-outlined text-green-500 text-2xl">groups</span>
                    <span className="text-green-500 font-semibold">Team Performance</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-card-foreground">90%</span>
                    <span className="text-muted-foreground text-sm">of team goals on track</span>
                </div>
                <ul className="mt-4 text-sm text-muted-foreground w-full">
                    <li className="flex justify-between py-1 border-b border-border"><span>Customer Service Team</span><span className="text-green-500 font-medium">On Track</span></li>
                    <li className="flex justify-between py-1 border-b border-border"><span>IT Department</span><span className="text-green-500 font-medium">On Track</span></li>
                    <li className="flex justify-between py-1"><span>Operations Team</span><span className="text-orange-500 font-medium">At Risk</span></li>
                </ul>
            </div>
        </div>
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">Team Goals</h3>
                <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-muted-foreground">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Goal</th>
                                    <th scope="col" className="px-6 py-3">Owner</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Due Date</th>
                                    <th scope="col" className="px-6 py-3">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamGoals.map((goal, index) => (
                                    <tr key={index} className="bg-card border-b dark:border-border">
                                        <th scope="row" className="px-6 py-4 font-medium text-card-foreground whitespace-nowrap">{goal.name}</th>
                                        <td className="px-6 py-4">{goal.owner}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${goal.statusColor}`}>{goal.status}</span>
                                        </td>
                                        <td className="px-6 py-4">{goal.dueDate}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-muted rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{width: `${goal.progress}%`}}></div></div>
                                                <span className="text-sm font-medium text-card-foreground">{goal.progress}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-card-foreground mb-4">Individual Goals</h3>
                <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-muted-foreground">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Employee</th>
                                    <th scope="col" className="px-6 py-3">Goal</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Due Date</th>
                                    <th scope="col" className="px-6 py-3">Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {individualGoals.map((goal, index) => (
                                    <tr key={index} className="bg-card border-b dark:border-border">
                                        <th scope="row" className="px-6 py-4 font-medium text-card-foreground whitespace-nowrap">{goal.employee}</th>
                                        <td className="px-6 py-4">{goal.goal}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${goal.statusColor}`}>{goal.status}</span>
                                        </td>
                                        <td className="px-6 py-4">{goal.dueDate}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-muted rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full" style={{width: `${goal.progress}%`}}></div></div>
                                                <span className="text-sm font-medium text-card-foreground">{goal.progress}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
