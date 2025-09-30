import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { leaderboard } from '@/lib/data';

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
            An overview of the members in your team.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leaderboard.map((user) => (
            <div key={user.name} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-card">
                <Avatar className="h-20 w-20">
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.title}</p>
                </div>
            </div>
            ))}
        </CardContent>
        </Card>
    </>
  );
}
