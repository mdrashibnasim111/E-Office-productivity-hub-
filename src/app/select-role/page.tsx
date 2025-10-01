
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
import { Briefcase, HardHat, Users, Building, ChevronRight, ArrowLeft, User, PenTool, Database, Laptop, FileText, Wrench, Microscope, BriefcaseBusiness, UserCog, Building2 } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type Designation = {
  name: string;
  icon: React.ComponentType<LucideProps>;
};

type Category = {
  name: string;
  icon: React.ComponentType<LucideProps>;
  designations: Designation[];
};


const categories: Category[] = [
  {
    name: 'Clerical / Support',
    icon: Users,
    designations: [
      { name: 'Office Assistant', icon: User },
      { name: 'Clerk', icon: FileText },
      { name: 'Data Entry Operator', icon: Database },
      { name: 'Junior Assistant', icon: User },
      { name: 'Typist', icon: PenTool },
    ],
  },
  {
    name: 'Technical / Professional',
    icon: HardHat,
    designations: [
      { name: 'Junior Engineer (JE)', icon: Wrench },
      { name: 'Assistant Engineer (AE)', icon: Wrench },
      { name: 'IT Officer', icon: Laptop },
      { name: 'Research Analyst', icon: Microscope },
      { name: 'Technical Officer', icon: HardHat },
    ],
  },
  {
    name: 'Supervisory / Field',
    icon: Users,
    designations: [
      { name: 'Field Inspector', icon: User },
      { name: 'Site Supervisor', icon: HardHat },
      { name: 'Field Officer', icon: User },
      { name: 'Surveyor', icon: PenTool },
      { name: 'Monitoring Officer', icon: Laptop },
    ],
  },
  {
    name: 'Managerial / Officers',
    icon: Briefcase,
    designations: [
      { name: 'Section Officer (SO)', icon: BriefcaseBusiness },
      { name: 'Project Manager', icon: Briefcase },
      { name: 'Deputy Manager', icon: BriefcaseBusiness },
      { name: 'Accounts Officer', icon: FileText },
      { name: 'HR Officer', icon: UserCog },
    ],
  },
  {
    name: 'Administrative / Executive',
    icon: Building,
    designations: [
      { name: 'Under Secretary', icon: Building2 },
      { name: 'Deputy Secretary', icon: Building2 },
      { name: 'Joint Secretary', icon: Building },
      { name: 'Director', icon: Briefcase },
      { name: 'Additional Director', icon: Briefcase },
      { name: 'Head of Department', icon: Building },
    ],
  },
];


export default function SelectRolePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F1822] p-4 sm:p-6 lg:p-8">
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
                className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer group bg-[#182531]"
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
              <Link href={`/dashboard?designation=${encodeURIComponent(designation.name)}`} key={designation.name} className="block">
                <Card className="flex flex-col items-center justify-center text-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full p-6 group bg-[#182531] hover:bg-card/60">
                   <designation.icon className="h-10 w-10 mb-4 text-primary transition-colors duration-300 group-hover:text-accent" />
                  <CardTitle className="font-headline text-base">{designation.name}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
