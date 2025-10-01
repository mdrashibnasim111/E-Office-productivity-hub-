'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, ListTodo, Users, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart2, Trophy, ClipboardCheck } from 'lucide-react';


const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/team', icon: Users, label: 'Team' },
];

const moreNavItems = [
    { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
    { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
    { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
]

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-card lg:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
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
      </div>
    </div>
  );
}
