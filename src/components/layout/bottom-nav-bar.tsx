
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ListTodo,
  Target,
  Users,
  ClipboardCheck,
} from 'lucide-react';
import { useUser, type AppUser } from '@/firebase';
import { cn } from '@/lib/utils';

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


export function BottomNavBar() {
  const pathname = usePathname();
  const { user } = useUser();
  const isManager = (user as AppUser)?.role === 'Manager';
  const navItems = isManager ? managerNavItems : baseNavItems;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-navbar/80 backdrop-blur-sm lg:hidden">
      <nav className="flex justify-around items-center p-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200',
              pathname === item.href
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-bold">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="h-4 bg-navbar" />
    </footer>
  );
}
