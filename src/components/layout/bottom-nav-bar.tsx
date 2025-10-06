
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, Target, Users, ClipboardCheck, Loader2 } from 'lucide-react';
import { useUser, type AppUser } from '@/firebase';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/team', icon: Users, label: 'Team' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Profile' },
];


export function BottomNavBar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  
  const isLoading = isUserLoading;

  return (
    <footer className="sticky bottom-0 border-t border-border-divider bg-navbar/80 backdrop-blur-sm z-50 lg:hidden">
        {isLoading ? (
            <div className="grid h-full place-items-center py-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        ) : (
            <nav className="flex justify-around py-2">
                {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md ${
                    pathname === item.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                >
                    <item.icon className="h-5 w-5" />
                    <p className="text-xs font-medium">{item.label}</p>
                </Link>
                ))}
            </nav>
        )}
    </footer>
  );
}
