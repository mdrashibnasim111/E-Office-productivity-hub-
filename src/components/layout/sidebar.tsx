
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
  Moon,
  Sun,
} from 'lucide-react';
import Logo from '@/components/icons/logo';
import { useUser, useDoc, useFirestore, useMemoFirebase, useAuth, type AppUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { Avatar, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
    { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
];

const sharedNavItems = [
    { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');


export function Sidebar() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const isManager = (user as AppUser)?.role === 'Manager';
  const navItems = isManager ? managerNavItems : baseNavItems;

  const handleLogout = async () => {
    if(auth) {
      await signOut(auth);
      router.push('/login');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="hidden border-r bg-navbar lg:block">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-16 items-center border-b border-border-divider px-4 lg:h-20 lg:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg text-text-heading">e-Office Hub</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
            {isUserLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full bg-card" />
                    <Skeleton className="h-10 w-full bg-card" />
                    <Skeleton className="h-10 w-full bg-card" />
                    <Skeleton className="h-10 w-full bg-card" />
                </div>
            ) : (
                <>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Menu</p>
                  {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-text-secondary transition-all hover:text-text-primary ${
                        pathname.startsWith(item.href) && item.href !== '/dashboard' || pathname === item.href ? 'bg-card text-text-primary' : ''
                        }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                  ))}
                   <p className="px-3 py-2 mt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Social</p>
                   {sharedNavItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-text-secondary transition-all hover:text-text-primary ${
                        pathname.startsWith(item.href) ? 'bg-card text-text-primary' : ''
                        }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                  ))}
                </>
            )}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-border-divider">
          <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.photoURL || managerAvatar?.imageUrl} />
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary">{user?.displayName || 'e-Office User'}</p>
                <p className="text-xs text-text-secondary">{(user as AppUser)?.role || 'Employee'}</p>
              </div>
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-text-secondary hover:text-text-primary"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-text-secondary hover:text-text-primary"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
