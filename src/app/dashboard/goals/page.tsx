import { StatsCards } from "@/components/dashboard/stats-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Target, Check, TrendingUp } from 'lucide-react';

const kpis = [
    { title: "Reduce task completion time", value: "15%", target: "10%", status: "on-track" },
    { title: "Citizen satisfaction score", value: "92%", target: "95%", status: "behind" },
    { title: "Budget variance", value: "2%", target: "<5%", status: "on-track" },
    { title: "Employee engagement", value: "88%", target: "90%", status: "behind" },
]

export default function GoalsPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Goals & KPIs
      </h1>
      <StatsCards />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Key Performance Indicators</CardTitle>
          <CardDescription>Current status of the team's primary KPIs.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
            {kpis.map(kpi => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base font-medium">{kpi.title}</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">Target: {kpi.target}</p>
                    </CardContent>
                </Card>
            ))}
        </CardContent>
      </Card>

    </>
  );
}
