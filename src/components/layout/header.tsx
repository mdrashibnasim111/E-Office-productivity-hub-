'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { tasks } from '@/lib/data';
import { leaderboard } from '@/lib/data';
import { useMemo } from 'react';

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/goals', icon: Target, label: 'Goals & KPIs' },
    { href: '/dashboard/tasks', icon: ListTodo, label: 'Tasks' },
    { href: '/dashboard/team', icon: Users, label: 'Team' },
    { href: '/dashboard/performance', icon: ClipboardCheck, label: 'Performance' },
    { href: '/dashboard/reports', icon: BarChart2, label: 'Reports' },
    { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
];

const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');

export function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);


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

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <div className="lg:hidden">
        <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
        >
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg sr-only sm:not-sr-only">e-Office Hub</span>
        </Link>
      </div>

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            {managerAvatar && (
                <Image src={managerAvatar.imageUrl} width={36} height={36} alt="Manager Avatar" className="rounded-full" data-ai-hint={managerAvatar.imageHint}/>
            )}
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
          <DropdownMenuItem asChild>
            <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
