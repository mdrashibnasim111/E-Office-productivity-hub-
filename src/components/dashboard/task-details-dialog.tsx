'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { Task, Comment } from '@/lib/data';
import { FileText, ImageIcon, Paperclip, Send, Calendar, User as UserIcon } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface TaskDetailsDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

const statusStyles: { [key: string]: string } = {
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

const attachmentIcons = {
  'PDF': <FileText className="h-5 w-5 text-red-500" />,
  'Image': <ImageIcon className="h-5 w-5 text-blue-500" />,
  'Document': <FileText className="h-5 w-5 text-blue-500" />,
};

const currentUser = {
    name: 'Jane Doe',
    avatar: PlaceHolderImages.find(i => i.id === 'avatar-manager')?.imageUrl || '',
};

export function TaskDetailsDialog({ task, isOpen, onClose }: TaskDetailsDialogProps) {
    const [comments, setComments] = useState<Comment[]>(task.comments);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() === '') return;

        const newCommentObject: Comment = {
            author: currentUser.name,
            avatar: currentUser.avatar,
            timestamp: 'Just now',
            text: newComment,
        };

        setComments([newCommentObject, ...comments]);
        setNewComment('');
    };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl pr-10">{task.title}</DialogTitle>
          <DialogDescription>
            Task ID: {task.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
          {/* Main Content */}
          <ScrollArea className="md:col-span-2 h-full">
            <div className="pr-6 space-y-6">
              {/* Task Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <Badge variant="outline" className={statusStyles[task.status]}>
                    {task.status}
                  </Badge>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>

              <Separator />

              {/* Attachments */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    Attachments
                </h3>
                <div className="space-y-3">
                  {task.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
                        <div className="flex items-center gap-3">
                            {attachmentIcons[file.type]}
                            <a href={file.url} className="text-sm font-medium hover:underline" download>
                                {file.name}
                            </a>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                    </div>
                  ))}
                   <Button variant="outline" className="w-full">
                        <Paperclip className="mr-2 h-4 w-4" />
                        Attach File
                    </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Comments Section */}
          <div className="md:col-span-1 flex flex-col h-full bg-muted/50 rounded-lg">
            <h3 className="font-semibold p-4 border-b">Comments</h3>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.text}</p>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
               <form onSubmit={handleCommentSubmit} className="relative">
                 <Input 
                    placeholder="Add a comment..." 
                    className="pr-10" 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                 />
                 <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
               </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
