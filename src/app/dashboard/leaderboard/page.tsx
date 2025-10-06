
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { teamRankings, leaderboard, Team, LeaderboardUser } from '@/lib/data';
import { BottomNavBar } from '@/components/layout/bottom-nav-bar';

export default function LeaderboardPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
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
            <p className="text-muted-foreground mt-1">Check out the top-performing teams and individuals.</p>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-bold text-card-foreground mb-4">
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

        <section>
          <h2 className="text-xl font-bold text-card-foreground mb-4">
            Individual Contributions
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
      </main>
      <BottomNavBar />
    </div>
  );
}

const TeamCard = ({ team }: { team: Team; isTop?: boolean }) => (
  <div className="rounded-lg bg-card p-4 shadow-lg relative overflow-hidden border">
    <div className="absolute top-0 right-0 -m-2 h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl">
      <span className="material-symbols-outlined text-4xl transform rotate-45">workspace_premium</span>
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
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${team.progress}%` }}
      ></div>
    </div>
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
            <span className="material-symbols-outlined text-base">{badge.icon}</span>
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
