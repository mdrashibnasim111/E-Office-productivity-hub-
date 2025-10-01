'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { teamGoals, individualGoals, Goal } from '@/lib/data';
import { Users, User, Target, Calendar } from 'lucide-react';

interface ActiveGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoalItem = ({ goal }: { goal: Goal }) => {
  const progressColor = goal.progress < 50 ? 'bg-destructive' : goal.progress < 80 ? 'bg-yellow-500' : 'bg-primary';
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <p className="font-semibold text-base flex-1 pr-4">{goal.title}</p>
        <div className="text-right">
            <div className="font-bold text-lg">{goal.progress}%</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                <Calendar className="h-3 w-3" />
                <span>{goal.deadline}</span>
            </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{goal.description}</p>
      <Progress value={goal.progress} className="h-2 [&>div]:" />
    </div>
  );
};


export function ActiveGoalsDialog({ isOpen, onClose }: ActiveGoalsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Target className="text-primary" />
            Active Goals
          </DialogTitle>
          <DialogDescription>
            An overview of current team and individual objectives.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-6">
            <Accordion type="multiple" defaultValue={['team-goals', 'individual-goals']} className="w-full">
              <AccordionItem value="team-goals">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    Team Goals ({teamGoals.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {teamGoals.map((goal) => (
                      <GoalItem key={goal.id} goal={goal} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="individual-goals">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Individual Goals ({individualGoals.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                     {individualGoals.map((goal) => (
                      <GoalItem key={goal.id} goal={goal} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
