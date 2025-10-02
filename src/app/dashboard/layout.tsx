import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { FirebaseClientProvider } from '@/firebase';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <FirebaseClientProvider>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col relative overflow-hidden custom-gradient-background">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-transparent pb-20 lg:pb-6 z-10">
            {children}
          </main>
        </div>
        <BottomNavBar />
      </div>
    </FirebaseClientProvider>
  );
}
