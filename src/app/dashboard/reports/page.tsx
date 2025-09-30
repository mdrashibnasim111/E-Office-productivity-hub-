import { ProductivityChart } from "@/components/dashboard/productivity-chart";
import { StatsCards } from "@/components/dashboard/stats-cards";

export default function ReportsPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Reports
      </h1>
      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1">
        <div className="xl:col-span-2">
            <ProductivityChart />
        </div>
      </div>
    </>
  );
}
