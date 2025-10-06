
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Military, Check } from 'lucide-react';
import { teamRankings, leaderboard, Team, LeaderboardUser } from '@/lib/data';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Assuming current user is Ethan Carter for the Personal Progress Hub
const currentUser = leaderboard[0];

export default function LeaderboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center p-4 bg-background/80 backdrop-blur-sm lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="flex-1 text-center text-lg font-bold text-foreground pr-6">
          Leaderboard
        </h1>
      </header>
       <main className="flex-grow p-4 pb-24 lg:pb-4">
        <div className="hidden lg:block mb-6">
            <h1 className="text-3xl font-bold text-card-foreground">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">Check out your progress and where you and your team stand.</p>
        </div>

        <section className="mb-8">
            <h2 className="text-xl font-bold text-card-foreground mb-4">Personal Progress Hub</h2>
            <div className="rounded-lg bg-card p-4 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <Image
                        alt={currentUser.name}
                        className="h-20 w-20 rounded-full object-cover border-2 border-primary"
                        src={currentUser.avatar || ''}
                        width={80}
                        height={80}
                    />
                    <div>
                        <p className="text-xl font-semibold text-text-primary">{currentUser.name}</p>
                        <p className="text-sm text-text-secondary">Rank: #1 Individual</p>
                        <p className="text-sm text-text-secondary">Total Points: {currentUser.points}</p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-base font-semibold text-text-primary mb-2">Next Badge: "Productivity Pro"</h3>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-text-secondary">Progress to next level</p>
                        <p className="text-sm text-text-secondary">80%</p>
                    </div>
                    <Progress value={80} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-primary/20 p-3 rounded-lg flex flex-col items-center">
                        <Star className="h-8 w-8 text-primary mb-1"/>
                        <p className="text-lg font-bold text-primary">{currentUser.badges.length}</p>
                        <p className="text-xs text-text-secondary">Badges Earned</p>
                    </div>
                    <div className="bg-primary/20 p-3 rounded-lg flex flex-col items-center">
                        <Trophy className="h-8 w-8 text-primary mb-1"/>
                        <p className="text-lg font-bold text-primary">Elite</p>
                        <p className="text-xs text-text-secondary">Current Tier</p>
                    </div>
                </div>
            </div>
        </section>

        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <section>
              <h2 className="text-xl font-bold text-card-foreground my-4">
                Top Individual Contributors
              </h2>
              <div className="space-y-2">
                {leaderboard.map((user, index) => (
                  <IndividualRow
                    key={user.id}
                    user={user}
                    rank={index + 1}
                  />
                ))}
              </div>
            </section>
          </TabsContent>
          <TabsContent value="team">
            <section>
              <h2 className="text-xl font-bold text-card-foreground my-4">
                Team Rankings
              </h2>
              <div className="space-y-4">
                {teamRankings.map((team, index) =>
                  index === 0 ? (
                    <TeamCard key={team.name} team={team} isTop />
                  ) : (
                    <TeamRow key={team.name} team={team} rank={index + 1} />
                  )
                )}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
      <BottomNavBar />
    </div>
  );
}

const TeamCard = ({ team }: { team: Team; isTop?: boolean }) => (
  <div className="rounded-lg bg-card p-4 shadow-lg relative overflow-hidden border">
    <div className="absolute top-0 right-0 -m-2 h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
      <Star className="text-4xl transform rotate-12" />
    </div>
    <div className="flex items-center gap-4 mb-4">
      <Image
        alt={team.name}
        className="h-16 w-16 rounded-lg object-cover"
        src={team.avatar}
        width={64}
        height={64}
      />
      <div>
        <p className="text-lg font-semibold text-foreground">{team.name}</p>
        <p className="text-sm text-muted-foreground">
          {team.totalPoints} total points
        </p>
      </div>
    </div>
    <div className="flex justify-between items-center mb-2">
      <p className="text-base font-medium text-foreground">
        Team Progress
      </p>
      <p className="text-sm text-muted-foreground">
        {team.progress}% complete
      </p>
    </div>
    <Progress value={team.progress} />
    <div className="mt-4">
      <h3 className="text-base font-semibold text-foreground mb-2">
        Shared Badges
      </h3>
      <div className="flex flex-wrap gap-2">
        {team.sharedBadges.map((badge) => (
          <div
            key={badge.name}
            className="bg-primary/20 p-2 rounded-lg flex items-center gap-1 text-primary text-xs font-medium"
          >
            <Check className="text-base h-4 w-4"/>
            {badge.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TeamRow = ({ team, rank }: { team: Team; rank: number }) => (
  <div className="flex items-center gap-4 rounded-lg bg-card p-3 border">
    <Image
      alt={team.name}
      className="h-12 w-12 rounded-lg object-cover"
      src={team.avatar}
      width={48}
      height={48}
    />
    <div className="flex-grow">
      <p className="font-semibold text-foreground">{team.name}</p>
      <p className="text-sm text-muted-foreground">
        {team.totalPoints} total points
      </p>
    </div>
    <div className="flex items-center justify-center rounded-full bg-primary/20 h-8 w-8 text-sm font-bold text-primary">
      {rank}
    </div>
  </div>
);

const IndividualRow = ({ user, rank }: { user: LeaderboardUser; rank: number }) => (
  <div className="flex items-center gap-4 rounded-lg bg-card p-3 border">
    <Image
      alt={user.name}
      className="h-12 w-12 rounded-full object-cover"
      src={user.avatar || ''}
      width={48}
      height={48}
    />
    <div className="flex-grow">
      <p className="font-semibold text-foreground">{user.name}</p>
      <p className="text-sm text-muted-foreground">
        {user.points} points ({user.team})
      </p>
    </div>
    <div className="flex items-center justify-center rounded-full bg-primary/20 h-8 w-8 text-sm font-bold text-primary">
      {rank}
    </div>
  </div>
);
