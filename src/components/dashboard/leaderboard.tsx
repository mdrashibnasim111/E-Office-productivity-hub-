import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';

export function Leaderboard() {
  return (
    <Card className="flex-grow shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline">Top Performers</CardTitle>
        <CardDescription>
          Monthly leaderboard based on completed tasks and goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((user, index) => (
            <div key={user.name} className="flex items-center">
              <span className="text-lg font-bold w-6 text-muted-foreground mr-4">{index + 1}</span>
              <Avatar className="h-9 w-9">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.title}</p>
              </div>
              <div className="ml-auto font-medium text-primary">{user.points} pts</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
