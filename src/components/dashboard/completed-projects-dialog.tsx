
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { teamGoals, individualGoals, Goal } from '@/lib/data';
import { CheckCircle, User, Calendar, Users } from 'lucide-react';
import AnimatedList from '@/components/ui/animated-list';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface CompletedProjectsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const completedTeamGoals = teamGoals.filter(goal => goal.progress === 100);
const completedIndividualGoals = individualGoals.filter(goal => goal.progress === 100);

const GoalItem = ({ goal }: { goal: Goal }) => (
    <div className="flex flex-col gap-2 p-4 rounded-lg border bg-card/80 hover:bg-muted/50 transition-colors w-full">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-base">{goal.title}</p>
        <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
            {/* @ts-ignore */}
            {goal.assignee && <User className="h-3 w-3" />}
            {/* @ts-ignore */}
            <span>{goal.assignee || 'Team Goal'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>Completed on: {goal.deadline}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
    </div>
);


export function CompletedProjectsDialog({ isOpen, onClose }: CompletedProjectsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <CheckCircle className="text-accent" />
            Completed Projects & Goals
          </DialogTitle>
          <DialogDescription>
            A list of all objectives that have been successfully completed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full pr-6">
            <Accordion type="multiple" defaultValue={['team-goals', 'individual-goals']} className="w-full">
              <AccordionItem value="team-goals">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Team Goals ({completedTeamGoals.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    {completedTeamGoals.length > 0 ? completedTeamGoals.map((goal) => (
                      <GoalItem key={goal.id} goal={goal} />
                    )) : <p className="text-muted-foreground text-sm">No completed team goals.</p>}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="individual-goals">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    Individual Goals ({completedIndividualGoals.length})
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                     {completedIndividualGoals.length > 0 ? completedIndividualGoals.map((goal) => (
                      <GoalItem key={goal.id} goal={goal} />
                    )) : <p className="text-muted-foreground text-sm">No completed individual goals.</p>}
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
