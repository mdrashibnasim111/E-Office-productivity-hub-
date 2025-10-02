
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, ListTodo, Users, MoreHorizontal, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart2, Trophy, ClipboardCheck } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';


const baseNavItems = [
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
];

const managerNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/team', icon: Users, label: 'Team' },
];

const managerMoreNavItems = [
    { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
    { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
    { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
]

export function BottomNavBar() {
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
  const moreNavItems = isManager ? managerMoreNavItems : [];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-card lg:hidden">
        {isLoading ? (
            <div className="grid h-full place-items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        ) : (
            <div className={`grid h-full max-w-lg mx-auto font-medium grid-cols-${isManager ? '5' : '3'}`}>
                {navItems.map((item) => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-muted group ${
                    pathname === item.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                >
                    <item.icon className="w-5 h-5 mb-1" />
                    <span className="text-xs">{item.label}</span>
                </Link>
                ))}
                {isManager && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted group text-muted-foreground">
                                <MoreHorizontal className="w-5 h-5 mb-1" />
                                <span className="text-xs">More</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="top" className="mb-2 w-48">
                            {moreNavItems.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    <Link href={item.href} className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        )}
    </div>
  );
}
