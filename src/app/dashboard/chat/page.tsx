
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';

// Updated data based on the new design
const teamGroups = [
  {
    id: 1,
    name: 'Project Alpha Team',
    lastMessage: 'Sure, let\'s discuss the agenda for the upcoming meeting.',
    time: '10:45 AM',
    avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Department of Planning',
    lastMessage: 'The deadline for the report submission is approaching.',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Policy Review Committee',
    lastMessage: 'Please review the updated guidelines for the new initiative.',
    time: 'Mon',
    avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const individualChats = [
  {
    id: 1,
    name: 'Dr. Anya Sharma',
    lastMessage: 'I\'ve sent you the revised document. Please review.',
    time: '9:30 AM',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Mr. Rohan Verma',
    lastMessage: 'The meeting is scheduled for 3 PM tomorrow.',
    time: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Ms. Kavya Iyer',
    lastMessage: 'I\'ll be available for a quick call at 11 AM.',
    time: 'Tue',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];


const ChatListItem = ({ chat }: { chat: typeof teamGroups[0] }) => {
    const router = useRouter();
    return (
        <div 
            className="flex items-center gap-4 p-3 rounded-lg bg-card hover:bg-muted/80 cursor-pointer border border-border"
            onClick={() => router.push('/dashboard/chat/detail')}
        >
            <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-foreground">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{chat.lastMessage}</p>
            </div>
        </div>
    );
}

export default function ChatListPage() {
  return (
    <div className="flex flex-col h-screen justify-between bg-background">
      <div className="flex-grow overflow-y-auto">
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-card-foreground">Chats</h1>
            <Button size="icon" className="rounded-full">
              <Plus />
            </Button>
          </div>
        </header>
        <main className="p-4 space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-3 text-card-foreground">Team Groups</h2>
            <div className="space-y-2">
              {teamGroups.map(chat => <ChatListItem key={chat.id} chat={chat} />)}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-3 text-card-foreground">Individual</h2>
            <div className="space-y-2">
              {individualChats.map(chat => <ChatListItem key={chat.id} chat={chat} />)}
            </div>
          </div>
        </main>
      </div>
      <BottomNavBar />
    </div>
  );
}
