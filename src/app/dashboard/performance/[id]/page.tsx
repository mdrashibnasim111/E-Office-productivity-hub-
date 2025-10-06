
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Folder } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Mock data - in a real app, you'd fetch this based on params.id
const employeeData = {
    'user-001': {
        name: 'Ananya Sharma',
        title: 'Clerk',
        department: 'Finance Dept.',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-ananya')?.imageUrl || '',
        kpi: { score: 85, target: 90, achievement: 94 },
        tasks: { completed: 120, total: 150, rate: 80 },
        projects: [
            { role: 'Lead Analyst', name: 'Project Alpha' },
            { role: 'Data Analysis', name: 'Project Beta' },
        ],
        trend: [
            { month: 'Jan', score: 93 }, { month: 'Feb', score: 33 }, { month: 'Mar', score: 101 },
            { month: 'Apr', score: 61 }, { month: 'May', score: 45 }, { month: 'Jun', score: 121 },
        ],
    },
    'user-002': {
        name: 'Rohan Verma',
        title: 'Section Officer',
        department: 'Public Works',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-rohan')?.imageUrl || '',
        kpi: { score: 82, target: 85, achievement: 96 },
        tasks: { completed: 95, total: 110, rate: 86 },
        projects: [
            { role: 'Project Coordinator', name: 'City Bridge Repair' },
            { role: 'Site Inspector', name: 'New Highway Construction' },
        ],
        trend: [
            { month: 'Jan', score: 75 }, { month: 'Feb', score: 78 }, { month: 'Mar', score: 80 },
            { month: 'Apr', score: 85 }, { month: 'May', score: 82 }, { month: 'Jun', score: 88 },
        ],
    },
    'user-003': {
        name: 'Priya Singh',
        title: 'Director',
        department: 'Health',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-priya')?.imageUrl || '',
        kpi: { score: 76, target: 80, achievement: 95 },
        tasks: { completed: 40, total: 50, rate: 80 },
        projects: [
            { role: 'Program Lead', name: 'Public Health Initiative' },
            { role: 'Oversight', name: 'Community Clinic Expansion' },
        ],
        trend: [
            { month: 'Jan', score: 70 }, { month: 'Feb', score: 72 }, { month: 'Mar', score: 68 },
            { month: 'Apr', score: 75 }, { month: 'May', score: 78 }, { month: 'Jun', score: 76 },
        ],
    },
    'user-004': {
        name: 'Karan Gupta',
        title: 'Jr. Assistant',
        department: 'IT',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-karan')?.imageUrl || '',
        kpi: { score: 58, target: 70, achievement: 82 },
        tasks: { completed: 65, total: 100, rate: 65 },
        projects: [
            { role: 'Support Specialist', name: 'Helpdesk Ticketing System' },
            { role: 'Developer', name: 'Internal Portal Update' },
        ],
        trend: [
            { month: 'Jan', score: 50 }, { month: 'Feb', score: 55 }, { month: 'Mar', score: 62 },
            { month: 'Apr', score: 58 }, { month: 'May', score: 60 }, { month: 'Jun', score: 56 },
        ],
    }
};

export default function PerformanceDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const employee = employeeData[params.id as keyof typeof employeeData];

    if (!employee) {
        return <div className="p-4">Employee not found.</div>;
    }

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center bg-background/80 p-4 -mx-4 -mt-4 mb-4 border-b border-border backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold text-center flex-1 text-card-foreground">Individual Performance</h1>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 overflow-y-auto -mx-4">
        <div className="p-4">
            <div className="flex flex-col items-center gap-4">
                <Image src={employee.avatar} alt={employee.name} width={128} height={128} className="rounded-full bg-card" />
                <div className="text-center">
                    <p className="text-2xl font-bold text-card-foreground">{employee.name}</p>
                    <p className="text-base text-muted-foreground">{employee.title}</p>
                    <p className="text-base text-muted-foreground">{employee.department}</p>
                </div>
            </div>
        </div>

        <Tabs defaultValue="overview" className="w-full sticky top-[64px] z-10 bg-background/80 backdrop-blur-sm">
            <TabsList className="flex justify-center gap-8 px-4 border-b border-border bg-transparent rounded-none">
                <TabsTrigger value="overview" className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent px-2 pb-3 rounded-none">Overview</TabsTrigger>
                <TabsTrigger value="details" className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent px-2 pb-3 rounded-none">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 space-y-6">
                <section>
                    <h2 className="mb-4 text-lg font-bold text-card-foreground">KPI Scores</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Card><CardContent className="p-4"><p className="text-sm font-medium text-muted-foreground">Overall Score</p><p className="text-3xl font-bold text-card-foreground">{employee.kpi.score}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm font-medium text-muted-foreground">Target Score</p><p className="text-3xl font-bold text-card-foreground">{employee.kpi.target}</p></CardContent></Card>
                        <Card className="col-span-2"><CardContent className="p-4"><p className="text-sm font-medium text-muted-foreground">Achievement Rate</p><p className="text-3xl font-bold text-card-foreground">{employee.kpi.achievement}%</p></CardContent></Card>
                    </div>
                </section>

                <section>
                    <h2 className="mb-2 text-lg font-bold text-card-foreground">Performance Trends</h2>
                    <Card>
                        <CardContent className="p-4">
                            <p className="text-sm font-medium text-muted-foreground">KPI Score Over Time</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-bold text-card-foreground">{employee.kpi.score}</p>
                                <p className="text-sm font-medium text-destructive">-5%</p>
                            </div>
                            <p className="text-sm text-muted-foreground">Last 6 Months</p>
                            <div className="mt-4 h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={employee.trend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                                        <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="url(#colorUv)" strokeWidth={2} />
                                        <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-bold text-card-foreground">Task Completion</h2>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <Card><CardContent className="p-4"><p className="text-sm font-medium text-muted-foreground">Completed</p><p className="text-3xl font-bold text-card-foreground">{employee.tasks.completed}</p></CardContent></Card>
                        <Card><CardContent className="p-4"><p className="text-sm font-medium text-muted-foreground">Total</p><p className="text-3xl font-bold text-card-foreground">{employee.tasks.total}</p></CardContent></Card>
                    </div>
                    <div>
                        <div className="mb-1 flex justify-between text-sm">
                            <p className="font-medium text-muted-foreground">Completion Rate</p>
                            <p className="font-bold text-card-foreground">{employee.tasks.rate}%</p>
                        </div>
                        <Progress value={employee.tasks.rate} />
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-bold text-card-foreground">Project Contributions</h2>
                    <div className="space-y-2">
                        {employee.projects.map((proj, idx) => (
                             <Card key={idx}>
                                 <CardContent className="p-3 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Folder />
                                    </div>
                                    <div>
                                        <p className="font-medium text-card-foreground">{proj.role}</p>
                                        <p className="text-sm text-muted-foreground">{proj.name}</p>
                                    </div>
                                 </CardContent>
                             </Card>
                        ))}
                    </div>
                </section>
            </TabsContent>
            <TabsContent value="details" className="p-4">
                <p className="text-muted-foreground">Detailed view coming soon.</p>
            </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}
