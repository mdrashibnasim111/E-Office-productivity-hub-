
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useTheme } from 'next-themes';
import {
  Menu,
  Search,
  LayoutDashboard,
  Target,
  ListTodo,
  Users,
  BarChart2,
  Trophy,
  Settings,
  LogOut,
  User,
  ClipboardCheck,
  Moon,
  Sun,
  MessageSquare,
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
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import Logo from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { tasks } from '@/lib/data';
import { leaderboard } from '@/lib/data';
import { useAuth, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';


const baseNavItems = [
  { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
  { href: '/dashboard/goals', icon: Target, label: 'Goals & KPIs' },
  { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
  { href: '/dashboard/chat', icon: MessageSquare, label: 'Chat' },
];

const managerNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  ...baseNavItems,
  { href: '/dashboard/team', icon: Users, label: 'Team' },
  { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const auth = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );

  const allSearchableItems = useMemo(() => [
    ...tasks.map(task => task.title),
    ...leaderboard.map(user => user.name),
  ], []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filteredSuggestions = allSearchableItems
        .filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setIsSuggestionsVisible(true);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  }, [searchQuery, allSearchableItems]);

   useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const handleLogout = async () => {
    if(auth) {
        await signOut(auth);
        router.push('/');
    }
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
                A list of links to navigate the application.
            </SheetDescription>
          <nav className="grid gap-2 text-lg font-medium">
             <SheetClose asChild>
                <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                <Logo className="h-6 w-6 text-accent" />
                <span className="font-headline text-lg">e-Office Hub</span>
                </Link>
            </SheetClose>
            {managerNavItems.map(item => ( // For now, showing all items. This can be dynamic based on user role.
                <SheetClose asChild key={item.href}>
                    <Link
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent ${
                        pathname === item.href ? 'bg-muted text-accent' : ''
                        }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
         <form>
          <div className="relative" ref={searchContainerRef}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks, employees..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if(searchQuery) setIsSuggestionsVisible(true)}}
            />
            {isSuggestionsVisible && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full md:w-2/3 lg:w-1/3 rounded-md border bg-card text-card-foreground shadow-lg z-50">
                    <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                            <li 
                                key={index} 
                                className="px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                                onMouseDown={() => {
                                    setSearchQuery(suggestion);
                                    setIsSuggestionsVisible(false);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
          </div>
        </form>
      </div>

      <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Image src={user?.photoURL || managerAvatar?.imageUrl || ''} width={36} height={36} alt="User Avatar" className="rounded-full" data-ai-hint={managerAvatar?.imageHint}/>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
