
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Target } from 'lucide-react';
import { format } from 'date-fns';
import { leaderboard } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CreateGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const teams = ["Customer Service Team", "IT Department", "Operations Team", "Finance", "HR", "Field Operations", "Management"];

export function CreateGoalDialog({ isOpen, onClose }: CreateGoalDialogProps) {
    const { toast } = useToast();
    const [goalType, setGoalType] = useState<'team' | 'individual'>('team');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState<Date>();

    const handleSubmit = () => {
        // Here you would typically handle form submission, e.g., saving to a database.
        // For now, we'll just show a toast notification.
        console.log({
            title,
            description,
            goalType,
            assignee,
            dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : null
        });

        toast({
            title: "Goal Created!",
            description: `The goal "${title}" has been successfully created.`,
        });

        // Reset form and close dialog
        setTitle('');
        setDescription('');
        setAssignee('');
        setDueDate(undefined);
        onClose();
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl">
            <Target className="h-6 w-6 text-accent" />
            Create a New Goal
          </DialogTitle>
          <DialogDescription>
            Fill out the details below to set a new goal for your team or an individual.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
            <div className="grid gap-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input 
                    id="title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Enhance Digital Accessibility" />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                    id="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief description of the goal." />
            </div>
            <div className="grid gap-2">
                <Label>Goal Type</Label>
                 <RadioGroup defaultValue="team" value={goalType} onValueChange={(value: 'team' | 'individual') => setGoalType(value)} className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="team" id="team" />
                        <Label htmlFor="team">Team Goal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual">Individual Goal</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="assignee">{goalType === 'team' ? 'Assign to Team' : 'Assign to Employee'}</Label>
                <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger>
                        <SelectValue placeholder={`Select a ${goalType}`} />
                    </SelectTrigger>
                    <SelectContent>
                        {goalType === 'team' ? (
                            teams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)
                        ) : (
                            leaderboard.map(user => <SelectItem key={user.id} value={user.name}>{user.name}</SelectItem>)
                        )}
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
