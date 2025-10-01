'use client';

import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tasks, leaderboard } from "@/lib/data";
import { FileDown } from "lucide-react";

const timePeriods = [
  "Last 7 Days",
  "Last 30 Days",
  "This Quarter",
  "Last Quarter",
];
const departments = [...new Set(tasks.map((task) => task.team))];
const employees = leaderboard.map((user) => user.name);


export default function ReportsPage() {
  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
          Reports
        </h1>
        <div className="flex gap-2">
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export as PDF
            </Button>
            <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export as Excel
            </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Customize Your Report</CardTitle>
            <CardDescription>Select filters to generate a custom report.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                        {timePeriods.map(period => (
                            <SelectItem key={period} value={period}>{period}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                        {employees.map(emp => (
                            <SelectItem key={emp} value={emp}>{emp}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>

      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <div className="xl:col-span-2">
            <ProductivityChart />
        </div>
      </div>
    </>
  );
}
