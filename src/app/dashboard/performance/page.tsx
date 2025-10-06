
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const performanceData = [
    {
        name: 'Ananya Sharma',
        title: 'Clerk, Finance Dept.',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-ananya')?.imageUrl || '',
        score: 95,
        completion: 98,
        avgTime: 1.8,
        borderColor: 'border-accent-highlight',
        bgColor: 'bg-accent-highlight',
    },
    {
        name: 'Rohan Verma',
        title: 'Section Officer, PW',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-rohan')?.imageUrl || '',
        score: 82,
        completion: 85,
        avgTime: 2.5,
        borderColor: 'border-sky-400',
        bgColor: 'bg-sky-400',
    },
    {
        name: 'Priya Singh',
        title: 'Director, Health',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-priya')?.imageUrl || '',
        score: 76,
        completion: 80,
        avgTime: 3.1,
        borderColor: 'border-yellow-500',
        bgColor: 'bg-yellow-500',
    },
    {
        name: 'Karan Gupta',
        title: 'Jr. Assistant, IT',
        avatar: PlaceHolderImages.find(p => p.id === 'avatar-karan')?.imageUrl || '',
        score: 58,
        completion: 65,
        avgTime: 4.2,
        borderColor: 'border-destructive',
        bgColor: 'bg-destructive',
    }
]

export default function IndividualPerformanceListPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-10 flex items-center bg-background/80 p-4 -mx-4 -mt-4 mb-4 border-b border-border backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-bold text-center flex-1 text-card-foreground">Individual Performance</h1>
        <Button variant="ghost" size="icon">
          <Search />
        </Button>
      </header>

      <main className="flex-grow space-y-4">
        {performanceData.map((person, index) => (
            <a key={index} className="block bg-card p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200" href="#">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image alt={person.name} className={`w-12 h-12 rounded-full border-2 ${person.borderColor}`} src={person.avatar} width={48} height={48} />
                        <div>
                            <p className="font-bold text-lg text-card-foreground">{person.name}</p>
                            <p className="text-sm text-muted-foreground">{person.title}</p>
                        </div>
                    </div>
                    <ChevronRight className="text-muted-foreground" />
                </div>
                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Overall Score</span>
                        <span className={`font-semibold text-foreground`}>{person.score}/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                        <div className={`${person.bgColor} h-2.5 rounded-full`} style={{ width: `${person.score}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Completion: {person.completion}%</span>
                        <span>Avg. Time: {person.avgTime} Days</span>
                    </div>
                </div>
            </a>
        ))}
      </main>
    </div>
  );
}
