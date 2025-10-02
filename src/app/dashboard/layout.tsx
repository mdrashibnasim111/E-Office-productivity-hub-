import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
          <Sidebar />
        <div className="flex flex-col">
            <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
      <BottomNavBar />
    </>
  );
}
