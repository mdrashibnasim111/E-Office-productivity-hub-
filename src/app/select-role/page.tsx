
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, HardHat, Users, Building, ChevronRight, ArrowLeft } from 'lucide-react';

const categories = [
  {
    name: 'Clerical / Support',
    icon: Users,
    designations: [
      'Office Assistant',
      'Clerk',
      'Data Entry Operator',
      'Junior Assistant',
      'Typist',
    ],
  },
  {
    name: 'Technical / Professional',
    icon: HardHat,
    designations: [
      'Junior Engineer (JE)',
      'Assistant Engineer (AE)',
      'IT Officer',
      'Research Analyst',
      'Technical Officer',
    ],
  },
  {
    name: 'Supervisory / Field',
    icon: Users,
    designations: [
      'Field Inspector',
      'Site Supervisor',
      'Field Officer',
      'Surveyor',
      'Monitoring Officer',
    ],
  },
  {
    name: 'Managerial / Officers',
    icon: Briefcase,
    designations: [
      'Section Officer (SO)',
      'Project Manager',
      'Deputy Manager',
      'Accounts Officer',
      'HR Officer',
    ],
  },
  {
    name: 'Administrative / Executive',
    icon: Building,
    designations: [
      'Under Secretary',
      'Deputy Secretary',
      'Joint Secretary',
      'Director',
      'Additional Director',
      'Head of Department',
    ],
  },
];

type Category = (typeof categories)[0];

export default function SelectRolePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center mb-10">
            {selectedCategory && (
                 <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="absolute top-8 left-8 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Categories
                </Button>
            )}
          <h1 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
            {selectedCategory ? `Select Your Designation` : 'Choose Your Category'}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            {selectedCategory
              ? `You've selected '${selectedCategory.name}'. Now, please choose your specific role.`
              : 'Please select your employee category to proceed.'}
          </p>
        </div>

        {!selectedCategory ? (
          // Category Selection
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                onClick={() => setSelectedCategory(category)}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer group bg-[#1E3347]"
              >
                <CardHeader className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <category.icon className="h-10 w-10 mb-4 text-[#11E0E0]" />
                    <ChevronRight className="h-6 w-6 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <CardTitle className="font-headline text-xl">{category.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          // Designation Selection
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {selectedCategory.designations.map((designation) => (
              <Link href={`/dashboard?designation=${encodeURIComponent(designation)}`} key={designation} className="block">
                <Card className="flex flex-col items-center justify-center text-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full p-6">
                  <CardTitle className="font-headline text-base">{designation}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
