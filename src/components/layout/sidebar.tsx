
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  Bell,
  Home,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  Target,
  Trophy,
  Users,
  ClipboardCheck,
} from 'lucide-react';
import Logo from '@/components/icons/logo';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const baseNavItems = [
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals & KPIs' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
];

const managerNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ...baseNavItems,
  { href: '/dashboard/team', icon: Users, label: 'Team' },
  { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
];


export function Sidebar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);
  
  const isLoading = isUserLoading || isUserDocLoading;

  const isManager = userData?.role === 'Manager';
  const navItems = isManager ? managerNavItems : baseNavItems;

  return (
    <div className="hidden border-r bg-card lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:h-20 lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg">e-Office Hub</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {isLoading ? (
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            ) : (
                navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname === item.href ? 'bg-muted text-primary' : ''
                    }`}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
                ))
            )}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
