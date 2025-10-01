'use client';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ListTodo, Target, Hand } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, Label } from 'recharts';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
import { ProductivityDetailsDialog } from '@/components/dashboard/productivity-details-dialog';
import { CompletedTasksDialog } from '@/components/dashboard/completed-tasks-dialog';
import { PendingTasksDialog } from '@/components/dashboard/pending-tasks-dialog';
import { ActiveGoalsDialog } from '@/components/dashboard/active-goals-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { tasks } from '@/lib/data';

const score = 85; // The score value

const getScoreColor = (value: number) => {
  if (value < 50) {
    return 'hsl(var(--destructive))';
  }
  if (value < 80) {
    return 'hsl(var(--warning))';
  }
  return 'hsl(var(--primary))';
};

const chartConfig = {
  score: {
    label: 'Score',
  },
};

const completedTasksCount = tasks.filter(task => task.status === 'Completed').length;
const pendingTasks = tasks.filter(task => task.status === 'Pending');
const pendingTasksCount = pendingTasks.length;
const urgentPendingTasksCount = pendingTasks.filter(task => task.description.toLowerCase().includes('urgent')).length;


export function StatsCards() {
  const [isProductivityDialogOpen, setIsProductivityDialogOpen] = useState(false);
  const [isCompletedTasksDialogOpen, setIsCompletedTasksDialogOpen] = useState(false);
  const [isPendingTasksDialogOpen, setIsPendingTasksDialogOpen] = useState(false);
  const [isGoalsDialogOpen, setIsGoalsDialogOpen] = useState(false);

  const scoreColor = useMemo(() => getScoreColor(score), []);

  const chartData = useMemo(() => [
    { name: 'Score', value: score, fill: scoreColor },
    { name: 'Remaining', value: 100 - score, fill: 'hsl(var(--muted))' }
  ], [scoreColor]);


  return (
    <>
      <TooltipProvider>
      <Card 
        className="flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all shadow-dynamic"
        onClick={() => setIsProductivityDialogOpen(true)}
        style={{ '--shadow-color': scoreColor } as React.CSSProperties}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            Overall Productivity
          </CardTitle>
           <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Hand className="h-4 w-4" />
                    <span>click here</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <div className="h-[120px] w-full" style={{ filter: `drop-shadow(0 4px 6px ${scoreColor})` }}>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square h-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  strokeWidth={5}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={450}
                >
                    {chartData.map((entry) => (
                         <Cell key={entry.name} fill={entry.fill} />
                    ))}
                     <Label
                        content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                            <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold font-headline"
                                >
                                {chartData[0].value.toLocaleString()}%
                                </tspan>
                            </text>
                            )
                        }
                        }}
                    />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="shadow-dynamic cursor-pointer hover:border-primary/50 transition-all"
        style={{ '--shadow-color': 'hsl(var(--primary) / 0.4)' } as React.CSSProperties}
        onClick={() => setIsCompletedTasksDialogOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            Tasks Completed
          </CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Hand className="h-4 w-4" />
                    <span>click here</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{completedTasksCount}</div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>

      <Card 
        className="shadow-dynamic cursor-pointer hover:border-primary/50 transition-all" 
        style={{ '--shadow-color': 'hsl(var(--primary) / 0.4)' } as React.CSSProperties}
        onClick={() => setIsPendingTasksDialogOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ListTodo className="h-4 w-4 text-muted-foreground" />
            Pending Tasks
          </CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Hand className="h-4 w-4" />
                    <span>click here</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">{pendingTasksCount}</div>
          <p className="text-xs text-muted-foreground">{urgentPendingTasksCount} urgent</p>
        </CardContent>
      </Card>
      <Card 
        className="shadow-dynamic cursor-pointer hover:border-primary/50 transition-all"
        style={{ '--shadow-color': 'hsl(var(--primary) / 0.4)' } as React.CSSProperties}
        onClick={() => setIsGoalsDialogOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            Active Goals
          </CardTitle>
           <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Hand className="h-4 w-4" />
                    <span>click here</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">8</div>
          <p className="text-xs text-muted-foreground">3 team, 5 individual</p>
        </CardContent>
      </Card>
      </TooltipProvider>
      <ProductivityDetailsDialog isOpen={isProductivityDialogOpen} onClose={() => setIsProductivityDialogOpen(false)} />
      <CompletedTasksDialog isOpen={isCompletedTasksDialogOpen} onClose={() => setIsCompletedTasksDialogOpen(false)} />
      <PendingTasksDialog isOpen={isPendingTasksDialogOpen} onClose={() => setIsPendingTasksDialogOpen(false)} />
      <ActiveGoalsDialog isOpen={isGoalsDialogOpen} onClose={() => setIsGoalsDialogOpen(false)} />
    </>
  );
}
