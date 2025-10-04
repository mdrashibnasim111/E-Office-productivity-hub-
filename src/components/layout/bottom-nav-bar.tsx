
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, Target, Users, User as ProfileIcon, Loader2 } from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

const navItems = [
  { href: '/dashboard', icon: 'home', label: 'Home' },
  { href: '/dashboard/tasks', icon: 'task_alt', label: 'Tasks' },
  { href: '/dashboard/goals', icon: 'business_center', label: 'Projects' },
  { href: '/dashboard/team', icon: 'group', label: 'Team' },
  { href: '/dashboard/performance', icon: 'person', label: 'Profile' },
];


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
                    className={`flex flex-col items-center justify-end gap-1 ${
                    pathname === item.href
                        ? 'text-info'
                        : 'text-text-secondary hover:text-info'
                    }`}
                >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <p className="text-xs font-medium">{item.label}</p>
                </Link>
                ))}
            </nav>
        )}
    </footer>
  );
}
