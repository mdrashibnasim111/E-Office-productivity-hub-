import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { FirebaseClientProvider } from '@/firebase';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <FirebaseClientProvider>
        <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark">
          <aside className="w-64 bg-background-light dark:bg-background-dark p-4 flex-col justify-between border-r border-gray-200 dark:border-gray-700 hidden lg:flex">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9VmIg9RPcnI70yFe2_jvB-N3ZbhO70ua8ImCIKtYeIFCPA2KlhnFqUaWXHSVKmpdeZj-TJ_nAZOhr-tQRGvFQ9CIG0SMgErrTudCoDM61MDnTEtylzDe0MtY1-b96xCf7dHd3pqEzenVGJyLIFGbAwqlqf6lFMLht-hPj_OXXC7nwn-nnFon9OMMQGdvoRAYeGvsKsMSPZKJx0fwsfQEtGlCBP6AU30sR-Oip6xBEdN7Nb7f1tIN8aPP2ZAC8hvbQyDPrwsa2X6Y")'}}></div>
                <h1 className="text-gray-900 dark:text-white text-lg font-bold">e-Office</h1>
              </div>
              <nav className="flex flex-col gap-2">
                <a className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded" href="/dashboard">
                  <span className="material-symbols-outlined">dashboard</span>
                  <span className="text-sm font-medium">Dashboard</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded" href="/dashboard/goals">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>emoji_events</span>
                  <span className="text-sm font-medium">Goals</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded" href="/dashboard/tasks">
                  <span className="material-symbols-outlined">task_alt</span>
                  <span className="text-sm font-medium">Tasks</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded" href="/dashboard/reports">
                  <span className="material-symbols-outlined">monitoring</span>
                  <span className="text-sm font-medium">Reports</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded" href="#">
                  <span className="material-symbols-outlined">settings</span>
                  <span className="text-sm font-medium">Settings</span>
                </a>
              </nav>
            </div>
            <div>
              <a className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded" href="#">
                <span className="material-symbols-outlined">help_outline</span>
                <span className="text-sm font-medium">Help and feedback</span>
              </a>
            </div>
          </aside>
          <div className="flex flex-col flex-1 relative overflow-hidden">
            {children}
          </div>
        </div>
      </FirebaseClientProvider>
    </>
  );
}
