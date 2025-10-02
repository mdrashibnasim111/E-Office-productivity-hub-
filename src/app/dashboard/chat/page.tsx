'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Paperclip, Send } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Message {
  id: number;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const currentUser = {
    name: 'Jane Doe',
    avatar: PlaceHolderImages.find(i => i.id === 'avatar-manager')?.imageUrl || '',
};

const initialMessages: Message[] = [
    { id: 1, author: 'Sarah Lee', avatar: PlaceHolderImages.find(i => i.id === 'avatar-1')?.imageUrl || '', text: "Hey everyone, just a reminder that the Q3 financial report is due next week.", timestamp: "10:30 AM", isCurrentUser: false },
    { id: 2, author: 'Jane Doe', avatar: currentUser.avatar, text: "Thanks for the reminder, Sarah. I've reviewed the draft and left some comments.", timestamp: "10:32 AM", isCurrentUser: true },
    { id: 3, author: 'David Chen', avatar: PlaceHolderImages.find(i => i.id === 'avatar-2')?.imageUrl || '', text: "Got it. I'll get the HR stats over to you by EOD.", timestamp: "10:35 AM", isCurrentUser: false },
];


export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const message: Message = {
            id: messages.length + 1,
            author: currentUser.name,
            avatar: currentUser.avatar,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Team Chat
      </h1>
      <div className="flex flex-col h-[calc(100vh-200px)] bg-card border rounded-lg shadow-sm">
        <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={msg.avatar} />
                            <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`flex flex-col gap-1 ${msg.isCurrentUser ? 'items-end' : ''}`}>
                             <div className={`rounded-lg p-3 max-w-xs md:max-w-md ${msg.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{msg.author}</span>
                                <span>&middot;</span>
                                <span>{msg.timestamp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
            <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                />
                 <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                    <span className="sr-only">Attach file</span>
                </Button>
                <Button type="submit" size="icon">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                </Button>
            </form>
        </div>
      </div>
    </>
  );
}