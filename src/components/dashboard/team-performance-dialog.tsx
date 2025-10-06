
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Filter } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface TeamPerformanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const performanceTrend = [
    { month: 'Apr', height: '60%' },
    { month: 'May', height: '75%' },
    { month: 'Jun', height: '90%' },
    { month: 'Jul', height: '80%' },
    { month: 'Aug', height: '85%' },
]

const teamMembers = [
    { name: 'Anil Kapoor', initials: 'AK', title: 'Senior Accountant', score: 98 },
    { name: 'Bhavna Gupta', initials: 'BG', title: 'Junior Accountant', score: 91 },
    { name: 'Chirag Verma', initials: 'CV', title: 'Auditor', score: 85 },
]

const getScoreColor = (score: number) => {
    if (score > 95) return 'text-primary';
    if (score > 89) return 'text-sky-400';
    return 'text-yellow-500';
}

export function TeamPerformanceDialog({ isOpen, onClose }: TeamPerformanceDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-screen md:h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="flex-row items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft />
          </Button>
          <DialogTitle className="font-headline text-lg text-center flex-1">Team Performance</DialogTitle>
          <Button variant="ghost" size="icon">
            <Filter />
          </Button>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-base font-semibold text-muted-foreground mb-2">Finance Department</h2>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-primary">92%</p>
                                <p className="text-xs text-muted-foreground">KPI Score</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-sky-400">85%</p>
                                <p className="text-xs text-muted-foreground">Projects</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-500">95%</p>
                                <p className="text-xs text-muted-foreground">Tasks</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h2 className="text-lg font-bold text-card-foreground mb-4">Performance Trend</h2>
                        <div className="h-48">
                            <div className="w-full h-full flex items-end justify-between space-x-2">
                                {performanceTrend.map(item => (
                                    <div key={item.month} className="flex flex-col items-center space-y-1 w-full">
                                        <div className="w-6 bg-primary rounded-t-sm" style={{ height: item.height }}></div>
                                        <span className="text-xs text-muted-foreground">{item.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <section>
                    <h2 className="text-lg font-bold mb-3 text-card-foreground">Team Members</h2>
                    <div className="space-y-3">
                        {teamMembers.map(member => (
                             <Card key={member.name}>
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarFallback>{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-foreground">{member.name}</p>
                                            <p className="text-sm text-muted-foreground">{member.title}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-lg font-bold ${getScoreColor(member.score)}`}>{member.score}%</p>
                                        <p className="text-xs text-muted-foreground">KPI Score</p>
                                    </div>
                                </CardContent>
                             </Card>
                        ))}
                    </div>
                </section>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
