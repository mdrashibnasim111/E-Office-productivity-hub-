
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { leaderboard } from '@/lib/data';
import ChromaGrid from '@/components/dashboard/ChromaGrid';
import type { ChromaItem } from '@/components/dashboard/ChromaGrid';


export default function TeamPage() {
  const [gridItems, setGridItems] = useState<ChromaItem[]>([]);

  useEffect(() => {
    // This effect runs only on the client-side after the component mounts.
    const items = leaderboard.map(user => ({
        image: user.avatar || `https://i.pravatar.cc/300?u=${user.id}`,
        title: user.name,
        subtitle: user.title,
        handle: `@${user.name.split(' ')[0].toLowerCase()}`,
        // Math.random() is now safe to use here.
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), 
        gradient: `linear-gradient(145deg, hsl(var(--primary)), #000)`,
        url: '#'
    }));
    setGridItems(items);
  }, []);

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
                items={gridItems} 
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
