'use client';
import { useState } from 'react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const chartData = [{ name: 'Score', value: 85, fill: 'hsl(var(--primary))' }];

const chartConfig = {
  score: {
    label: 'Score',
  },
};

export function StatsCards() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
      <Card 
        className="flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Overall Productivity
          </CardTitle>
           <Tooltip>
            <TooltipTrigger>
              <Hand className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to view details</p>
            </TooltipContent>
          </Tooltip>
        </CardHeader>
        <CardContent>
          <div className="h-[120px] w-full">
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
                    <Cell
                        key="score"
                        fill="hsl(var(--primary))"
                        className="fill-primary"
                      />
                      <Cell
                        key="background"
                        fill="hsl(var(--muted))"
                      />
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
      </TooltipProvider>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">124</div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
          <ListTodo className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">32</div>
          <p className="text-xs text-muted-foreground">5 urgent</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">8</div>
          <p className="text-xs text-muted-foreground">3 team, 5 individual</p>
        </CardContent>
      </Card>

      <ProductivityDetailsDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
}
