
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Paperclip,
  Send,
  ArrowLeft,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';


const participants = [
    { name: 'Ethan Carter', role: 'Manager', avatar: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=2521&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', online: true },
    { name: 'Olivia Bennett', role: 'Employee', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', online: true },
    { name: 'Noah Thompson', role: 'Employee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', online: true },
    { name: 'Ava Harper', role: 'Employee', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', online: true },
];

const milestones = [
    { name: 'Initial Draft', progress: 100, color: 'bg-green-500' },
    { name: 'Budget Finalization', progress: 75, color: 'bg-yellow-500' },
    { name: 'Client Approval', progress: 50, color: 'bg-blue-500' },
];

const badges = [
    { name: 'Team Player', icon: Users, color: 'bg-purple-500' },
    { name: 'Top Contributor', icon: Star, color: 'bg-pink-500' },
    { name: 'Milestone Achiever', icon: Trophy, color: 'bg-green-500' },
]

const leaderboard = [
    { name: 'Olivia Bennett', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', points: 1200, color: 'text-green-400' },
    { name: 'Noah Thompson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', points: 1000, color: 'text-yellow-400' },
    { name: 'Ava Harper', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', points: 950, color: 'text-blue-400' },
]

const quickReplies = ["👍 Awesome!", "Will do.", "Okay!", "Got it!", "😁", "🥳"];

const initialMessages = [
    { author: 'Ethan Carter', avatar: participants[0].avatar, time: '10:30 AM', isYou: false, content: "Good morning, team. Let's discuss the progress on the project." },
    { author: 'Olivia Bennett', avatar: participants[1].avatar, time: '10:31 AM', isYou: true, content: "Morning, Ethan. We've completed the initial draft and are ready for review." },
    { author: 'Ethan Carter', avatar: participants[0].avatar, time: '10:32 AM', isYou: false, content: "Great work, Olivia. Noah, can you share the latest updates on the budget?" },
    { author: 'Noah Thompson', avatar: participants[2].avatar, time: '10:33 AM', isYou: true, content: "Sure, Ethan. The budget is on track, with a slight variance due to unexpected expenses." },
    { author: 'Ethan Carter', avatar: participants[0].avatar, time: '10:34 AM', isYou: false, content: "Thanks, Noah. Ava, how's the client communication going?" },
    { author: 'Ava Harper', avatar: participants[3].avatar, time: '10:35 AM', isYou: true, content: "Client is satisfied with the progress. We have a meeting scheduled next week to finalize the details." },
    { author: 'Ethan Carter', avatar: participants[0].avatar, time: '10:36 AM', isYou: false, content: (
        <div className="w-64">
            <p className="mb-2 font-semibold">Quick Poll: Project Deadline?</p>
            <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">👍 Next Week</Button>
                <Button variant="outline" className="w-full justify-start">👎 End of Month</Button>
            </div>
        </div>
    )},
];

type MessageType = {
    author: string;
    avatar: string;
    time: string;
    isYou: boolean;
    content: React.ReactNode;
};

export default function ChatDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatName = searchParams.get('name') || 'Chat';
  const chatType = searchParams.get('type');
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage: MessageType = {
        author: 'Olivia Bennett', // Assuming the current user is Olivia
        avatar: participants[1].avatar,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYou: true,
        content: inputValue,
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleQuickReply = (reply: string) => {
    const newMessage: MessageType = {
        author: 'Olivia Bennett',
        avatar: participants[1].avatar,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYou: true,
        content: reply,
      };
      setMessages([...messages, newMessage]);
  }

  return (
      <div className="flex h-screen flex-col bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 shadow-md bg-card">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-lg font-bold text-card-foreground">{chatName}</h1>
            <div className="w-10"></div>
        </header>

        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            {chatType === 'group' && (
                <aside className="hidden w-full flex-col border-r p-4 sm:w-80 md:flex border-border bg-card">
                    <ScrollArea className="flex-1">
                        <h2 className="mb-4 text-xl font-bold text-card-foreground">Participants</h2>
                        <div className="space-y-4">
                            {participants.map(p => (
                                <div key={p.name} className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={p.avatar} alt={p.name} />
                                            <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {p.online && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 bg-primary border-card"></span>}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{p.name}</p>
                                        <p className="text-sm text-muted-foreground">{p.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="mb-4 mt-6 text-xl font-bold text-card-foreground">Milestones</h2>
                        <div className="space-y-4">
                            {milestones.map(m => (
                                <div key={m.name}>
                                    <p className="mb-1 text-sm font-semibold text-foreground">{m.name}</p>
                                    <Progress value={m.progress} className="h-2.5" />
                                </div>
                            ))}
                        </div>

                        <h2 className="mb-4 mt-6 text-xl font-bold text-card-foreground">Badges</h2>
                        <div className="flex flex-wrap gap-2">
                            {badges.map(b => (
                                <Badge key={b.name} className={`${b.color} text-white`}>
                                    <b.icon className="mr-1 h-3 w-3"/>
                                    {b.name}
                                </Badge>
                            ))}
                        </div>

                        <h2 className="mb-4 mt-6 text-xl font-bold text-card-foreground">Leaderboard</h2>
                        <div className="space-y-3">
                            {leaderboard.map((l, i) => (
                                <div key={l.name} className="flex items-center justify-between rounded-lg p-2 bg-background">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-foreground">{i+1}.</span>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={l.avatar} alt={l.name}/>
                                            <AvatarFallback>{l.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-foreground">{l.name}</p>
                                    </div>
                                    <span className={`text-sm font-semibold ${l.color}`}>{l.points} pts</span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </aside>
            )}
            
            {/* Main Chat Area */}
            <main className="flex flex-1 flex-col bg-background">
                <ScrollArea ref={scrollAreaRef} className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
                    {messages.map((msg, index) => (
                        <Message key={index} author={msg.author} avatar={msg.avatar} time={msg.time} isYou={msg.isYou}>
                            {msg.content}
                        </Message>
                    ))}
                </ScrollArea>

                 {/* Message Input */}
                <div className="border-t p-4 bg-card border-border">
                    <div className="mb-3 flex space-x-2 overflow-x-auto pb-2">
                        {quickReplies.map(reply => (
                            <Button key={reply} variant="secondary" size="sm" className="rounded-full flex-shrink-0" onClick={() => handleQuickReply(reply)}>{reply}</Button>
                        ))}
                    </div>
                    <form className="relative" onSubmit={handleSendMessage}>
                        <Input
                            className="w-full rounded-full border py-3 pl-4 pr-24 focus:outline-none focus:ring-1 bg-background text-foreground border-border"
                            placeholder="Type your message..."
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground">
                                <Paperclip className="h-5 w-5" />
                            </Button>
                            <Button type="submit" className="ml-1 h-8 w-8 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
      </div>
  );
}


const Message = ({ author, avatar, time, isYou, children }: { author: string, avatar: string, time: string, isYou: boolean, children: React.ReactNode }) => {
    const alignment = isYou ? 'justify-end' : 'justify-start';
    const messageBubbleStyle = isYou ? 'rounded-tr-none bg-primary text-primary-foreground' : 'rounded-tl-none bg-card text-foreground';

    return (
        <div className={`group flex items-start gap-3 ${alignment}`}>
            {!isYou && <Avatar className="h-10 w-10"><AvatarImage src={avatar} /><AvatarFallback>{author.charAt(0)}</AvatarFallback></Avatar>}
             <div className={`flex flex-col ${isYou ? 'items-end' : 'items-start'}`}>
                <p className="text-sm font-semibold text-foreground">{author}</p>
                <div className={`relative mt-1 rounded-lg p-3 shadow-sm ${messageBubbleStyle}`}>
                    <div>{children}</div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex space-x-1 rounded-full bg-slate-800 p-1 shadow-lg">
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-sm hover:bg-slate-700">👍</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-sm hover:bg-slate-700">😂</button>
                            <button className="flex h-7 w-7 items-center justify-center rounded-full text-sm hover:bg-slate-700">🔥</button>
                        </div>
                    </div>
                </div>
                 <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
            {isYou && <Avatar className="h-10 w-10"><AvatarImage src={avatar} /><AvatarFallback>{author.charAt(0)}</AvatarFallback></Avatar>}
        </div>
    )
}

    