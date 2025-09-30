'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from '@/components/ui/chart';
import { productivityData } from '@/lib/data';

const chartConfig = {
    score: {
      label: "Productivity Score",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

export function ProductivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Weekly Productivity Trend</CardTitle>
        <CardDescription>
          An overview of the team's productivity score over the last 6 weeks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={productivityData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis domain={[50, 100]} tickLine={false} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                type="monotone"
                dataKey="score"
                stroke={chartConfig.score.color}
                strokeWidth={2}
                dot={true}
                />
            </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
