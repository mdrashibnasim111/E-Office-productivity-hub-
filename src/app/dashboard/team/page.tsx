'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { leaderboard } from '@/lib/data';
import ChromaGrid from '@/components/dashboard/ChromaGrid';

// Map leaderboard data to the format expected by ChromaGrid
const items = leaderboard.map(user => ({
    image: user.avatar || `https://i.pravatar.cc/300?u=${user.id}`,
    title: user.name,
    subtitle: user.title,
    handle: `@${user.name.split(' ')[0].toLowerCase()}`,
    borderColor: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), // Random color
    gradient: `linear-gradient(145deg, hsl(var(--primary)), #000)`,
    url: '#'
}));

export default function TeamPage() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">
        Team Members
      </h1>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Team</CardTitle>
          <CardDescription>
            An overview of the members in your team. Interact with the grid below.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div style={{ height: '600px', position: 'relative', width: '100%' }}>
              <ChromaGrid 
                items={items} 
                radius={300}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
        </CardContent>
      </Card>
    </>
  );
}
