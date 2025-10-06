
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Paperclip,
  Search,
  SendHorizontal,
  Smile,
} from 'lucide-react';
import Image from 'next/image';

export default function ChatPage() {
  const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');
  const avatar1 = PlaceHolderImages.find(i => i.id === 'avatar-1');
  const avatar2 = PlaceHolderImages.find(i => i.id === 'avatar-2');
  const avatar3 = PlaceHolderImages.find(i => i.id === 'avatar-3');
  const avatar4 = PlaceHolderImages.find(i => i.id === 'avatar-4');
  const loginImage = PlaceHolderImages.find(i => i.id === 'login-image');

  const chats = [
    {
      id: 1,
      name: 'Team Alpha',
      lastMessage: 'Last message: 2h ago',
      avatar:
        'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      active: true,
    },
    {
      id: 2,
      name: 'Project X',
      lastMessage: 'Last message: 1d ago',
      avatar:
        'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      active: false,
    },
    {
      id: 3,
      name: 'Sarah Chen',
      lastMessage: 'Last message: 30m ago',
      avatar: avatar1?.imageUrl,
      active: false,
    },
    {
      id: 4,
      name: 'Michael Lee',
      lastMessage: 'Last message: 2d ago',
      avatar: avatar2?.imageUrl,
      active: false,
    },
    {
      id: 5,
      name: 'HR Department',
      lastMessage: 'Last message: 1w ago',
      avatar: avatar3?.imageUrl,
      active: false,
    },
    {
      id: 6,
      name: 'David Kim',
      lastMessage: 'Last message: 5m ago',
      avatar: avatar4?.imageUrl,
      active: false,
    },
  ];

  return (
    <div className="grid h-screen w-full grid-cols-[300px_1fr] bg-background font-display text-foreground">
      {/* Sidebar */}
      <div className="flex flex-col border-r border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="text-xl font-bold text-foreground">Chats</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-full rounded-lg border-0 bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Search chats"
              type="text"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
            {chats.map(chat => (
              <a
                key={chat.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 ${
                  chat.active
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                }`}
                href="#"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold">{chat.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {chat.lastMessage}
                  </p>
                </div>
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="border-b border-border bg-card p-4">
          <h2 className="text-2xl font-bold text-foreground">Sarah Chen</h2>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="text-center text-sm text-muted-foreground">
              Today
            </div>
            {/* Message Received */}
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatar1?.imageUrl} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="max-w-md space-y-1">
                <div className="rounded-lg rounded-bl-none bg-muted p-3 text-foreground">
                  <p>
                    Hi there, I've reviewed the document you shared. It looks
                    great!
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">10:30 AM</p>
              </div>
            </div>
            {/* Message Sent */}
            <div className="flex flex-row-reverse items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={managerAvatar?.imageUrl} />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <div className="max-w-md space-y-1">
                <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                  <p>
                    Thanks, Sarah! I'm glad you like it. Any suggestions for
                    improvements?
                  </p>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  10:31 AM
                </p>
              </div>
            </div>
            {/* Message Received */}
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatar1?.imageUrl} />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="max-w-md space-y-1">
                <div className="rounded-lg rounded-bl-none bg-muted p-3 text-foreground">
                  <p>
                    Just a minor point on section 3. Could you elaborate on the
                    budget allocation?
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">10:32 AM</p>
              </div>
            </div>
            {/* Message Sent */}
            <div className="flex flex-row-reverse items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={managerAvatar?.imageUrl} />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <div className="max-w-md space-y-1">
                <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                  <p>
                    Sure, I'll add more details. I'll send you an updated
                    version by tomorrow.
                  </p>
                </div>
                <p className="text-right text-xs text-muted-foreground">
                  10:33 AM
                </p>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Yesterday
            </div>
            {/* Message with Image */}
            <div className="flex flex-row-reverse items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={managerAvatar?.imageUrl} />
                <AvatarFallback>YOU</AvatarFallback>
              </Avatar>
              <div className="max-w-md space-y-2">
                <div className="rounded-lg rounded-br-none bg-primary p-3 text-primary-foreground">
                  <p>Yes, I'm attaching it here.</p>
                </div>
                {loginImage && (
                  <Image
                    src={loginImage.imageUrl}
                    alt={loginImage.description}
                    width={400}
                    height={225}
                    className="max-w-sm rounded-lg"
                  />
                )}

                <p className="text-right text-xs text-muted-foreground">
                  Yesterday, 4:15 PM
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
        {/* Message Input */}
        <div className="border-t border-border bg-card p-4">
          <div className="relative flex items-center">
            <Input
              className="w-full rounded-full border-input bg-muted py-3 pl-5 pr-28 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Type a message"
              type="text"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button className="ml-2 h-8 w-8 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90">
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

    