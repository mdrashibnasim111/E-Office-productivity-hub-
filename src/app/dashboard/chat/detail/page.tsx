
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Paperclip,
  SendHorizontal,
  Smile,
  ArrowLeft
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ChatDetailPage() {
  const router = useRouter();
  const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');
  const avatar1 = PlaceHolderImages.find(i => i.id === 'avatar-1');
  const loginImage = PlaceHolderImages.find(i => i.id === 'login-image');


  return (
      <div className="flex flex-1 flex-col h-screen bg-background">
        <header className="flex items-center gap-4 border-b border-border bg-card p-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <Avatar>
                <AvatarImage src={avatar1?.imageUrl} />
                <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-lg font-bold text-foreground">Sarah Chen</h2>
                <p className="text-sm text-muted-foreground">Online</p>
            </div>
        </header>
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
  );
}
