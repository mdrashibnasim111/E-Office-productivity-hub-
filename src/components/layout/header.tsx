
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  User,
  LogOut,
  Moon,
  Sun,
  Home,
  ListTodo,
  Target,
  Users,
  ClipboardCheck,
  MessageSquare,
  BarChart2,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth, useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';

const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
  { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/dashboard/team', icon: Users, label: 'Team' },
  { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const getTitleFromPathname = (pathname: string): string => {
    if (pathname === '/dashboard') return 'Manager Dashboard';
    if (pathname.startsWith('/dashboard/performance/')) return 'Performance Details';
    
    const matchedItem = navItems.find(item => pathname.startsWith(item.href));
    return matchedItem ? matchedItem.label : 'Dashboard';
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pageTitle = getTitleFromPathname(pathname);


  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const handleLogout = async () => {
    if(auth) {
        await signOut(auth);
        router.push('/');
    }
  };

  return (
    <header className="flex items-center justify-between bg-navbar p-4 shadow-sm">
       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 lg:hidden text-text-primary">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-navbar">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg text-text-heading">e-Office Hub</span>
            </Link>
            <nav className="grid gap-2 text-lg font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsSheetOpen(false)}
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    pathname === item.href ? 'bg-card text-primary' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:block w-10"></div>

      <h1 className="text-lg font-bold text-text-heading text-center flex-1">{pageTitle}</h1>

      <div className="flex items-center gap-2">
        <button className="text-text-primary" onClick={toggleTheme}>
            <span className="material-symbols-outlined text-3xl hidden dark:inline">light_mode</span>
            <span className="material-symbols-outlined text-3xl dark:hidden">dark_mode</span>
        </button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className="text-text-primary">
                <span className="material-symbols-outlined text-3xl">
                    account_circle
                </span>
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border-divider">
            <DropdownMenuLabel className="text-text-heading">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border-divider"/>
            <DropdownMenuItem className="text-text-primary focus:bg-primary/20">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border-divider" />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-text-primary focus:bg-primary/20">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
