import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Briefcase, Users } from 'lucide-react';

const roles = [
  {
    name: 'Manager',
    description: 'Oversee team performance and manage tasks.',
    icon: Briefcase,
    href: '/dashboard'
  },
  {
    name: 'Field Officer',
    description: 'Collect and report data from the field.',
    icon: User,
    href: '/dashboard'
  },
  {
    name: 'Data Analyst',
    description: 'Analyze data and generate reports.',
    icon: Users,
    href: '/dashboard'
  },
];

export default function SelectRolePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
          Choose Your Role
        </h1>
        <p className="mt-4 text-muted-foreground">
          Please select your designation to proceed to your dashboard.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="block">
            <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full">
              <CardHeader className="flex-1 p-6">
                <role.icon className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="font-headline">{role.name}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">
                  {role.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
