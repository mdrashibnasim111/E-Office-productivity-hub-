import Link from 'next/link';
import Image from 'next/image';
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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import Logo from '@/components/icons/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '#', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '#', icon: Target, label: 'Goals & KPIs' },
  { href: '#', icon: ListTodo, label: 'Tasks' },
  { href: '#', icon: Users, label: 'Team' },
  { href: '#', icon: BarChart2, label: 'Reports' },
  { href: '#', icon: Trophy, label: 'Leaderboard' },
];

const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg">e-Office Hub</span>
            </Link>
            {navItems.map((item) => (
                 <Link
                 key={item.label}
                 href={item.href}
                 className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
               >
                 <item.icon className="h-5 w-5" />
                 {item.label}
               </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <nav className="grid gap-2 text-lg font-medium">
                 <Link
                    href="#"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <Settings className="h-5 w-5" />
                    Settings
                </Link>
                <Link
                    href="/"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tasks, employees..."
              className="w-full appearance-none bg-background pl-8 shadow-none lg:w-1/3"
            />
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
