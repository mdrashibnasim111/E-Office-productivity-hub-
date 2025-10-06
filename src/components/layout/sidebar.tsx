
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  MessageSquare,
} from 'lucide-react';
import Logo from '@/components/icons/logo';
import { useUser, useDoc, useFirestore, useMemoFirebase, useAuth, type AppUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

const baseNavItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/team', icon: Users, label: 'Team' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Profile' },
];

const managerNavItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
    { href: '/dashboard/goals', icon: Target, label: 'Goals' },
    { href: '/dashboard/team', icon: Users, label: 'Team' },
    { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
];


export function Sidebar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const isManager = (user as AppUser)?.role === 'Manager';
  const navItems = isManager ? managerNavItems : baseNavItems;

  const handleLogout = async () => {
    if(auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  return (
    <div className="hidden border-r bg-navbar lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-border-divider px-4 lg:h-20 lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg text-text-heading">e-Office Hub</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {isUserLoading ? (
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-8 w-full bg-card" />
                    <Skeleton className="h-8 w-full bg-card" />
                    <Skeleton className="h-8 w-full bg-card" />
                    <Skeleton className="h-8 w-full bg-card" />
                </div>
            ) : (
                navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-text-secondary transition-all hover:text-text-primary ${
                    pathname === item.href ? 'bg-card text-text-primary' : ''
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
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-secondary transition-all hover:text-text-primary justify-start w-full"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
