
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirestore } from '@/firebase';
import { saveOnboardingData } from '@/firebase/firestore/mutations';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const departments = ['Finance', 'HR', 'IT', 'Public Works', 'Health', 'Education', 'Operations'];
const designations: Record<string, Record<string, string[]>> = {
    'Manager': {
        'Finance': ['Finance Manager', 'Accounts Manager'],
        'HR': ['HR Manager', 'Recruitment Manager'],
        'IT': ['IT Manager', 'Systems Manager', 'Project Manager'],
        'Public Works': ['Project Manager', 'Operations Manager'],
        'Health': ['Clinic Manager', 'Public Health Manager'],
        'Education': ['Program Manager', 'Admissions Manager'],
        'Operations': ['Operations Manager']
    },
    'Employee': {
        'Finance': ['Accountant', 'Financial Analyst'],
        'HR': ['HR Generalist', 'Recruiter'],
        'IT': ['Software Developer', 'IT Support Specialist', 'Junior Engineer'],
        'Public Works': ['Civil Engineer', 'Technician'],
        'Health': ['Nurse', 'Health Educator'],
        'Education': ['Teacher', 'Admissions Officer'],
        'Operations': ['Operations Associate']
    }
};

const onboardingSchema = z.object({
  role: z.string().min(1, "Role is required."),
  department: z.string().min(1, "Department is required."),
  employeeId: z.string().min(1, "Employee ID is required."),
  fullName: z.string().min(1, "Full Name is required."),
  designation: z.string().min(1, "Designation is required."),
  contactPhone: z.string().min(1, "Contact phone is required."),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;
const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');


export default function OnboardingPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: '',
      department: '',
      employeeId: '',
      fullName: '',
      designation: '',
      contactPhone: '',
    },
  });

  const { watch, setValue } = form;
  const selectedRole = watch('role');
  const selectedDepartment = watch('department');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);
  
  useEffect(() => {
    if (user) {
      setValue('fullName', user.displayName || '');
      setValue('contactPhone', user.phoneNumber || '');
    }
  }, [user, setValue]);


  const onSubmit = (data: OnboardingFormValues) => {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated or Firestore not available.",
      });
      return;
    }
    
    saveOnboardingData(firestore, user, data);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your profile has been saved.",
    });

    router.push('/dashboard');
  };

  if (isUserLoading || !user) {
    return (
      <div className="w-full min-h-screen grid place-items-center p-4 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
        <div className="flex flex-col min-h-screen">
            <header className="bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10 border-b border-subtle-light dark:border-subtle-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="text-primary">
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-4.3l8-5.7v-2l-8 5.7l-8-5.7v2l8 5.7Z"></path></svg>
                            </div>
                            <h1 className="text-xl font-bold">e-Office</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="flex items-center justify-center size-10 rounded-full bg-subtle-light dark:bg-subtle-dark">
                                    <span className="material-symbols-outlined text-text-light dark:text-text-dark">notifications</span>
                                </button>
                            </div>
                            <button className="flex items-center gap-2">
                                <div className="size-10 rounded-full bg-cover bg-center" style={{backgroundImage: `url("${user?.photoURL || managerAvatar?.imageUrl || ''}")`}}></div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight">Complete Your Profile</h2>
                        <p className="mt-2 text-sm text-placeholder-light dark:text-placeholder-dark">
                            Please provide the following information to set up your account.
                        </p>
                    </div>
                    <div className="bg-background-light dark:bg-subtle-dark p-8 shadow-sm border border-subtle-light dark:border-subtle-dark rounded-lg space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark">
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Employee">Employee</SelectItem>
                                                    <SelectItem value="Manager">Manager</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Department</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole}>
                                                <FormControl>
                                                    <SelectTrigger className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark">
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Designation</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole || !selectedDepartment}>
                                                <FormControl>
                                                     <SelectTrigger className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark">
                                                        <SelectValue placeholder="Select Designation" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                     {selectedRole && selectedDepartment && designations[selectedRole]?.[selectedDepartment]?.map(desig => (
                                                        <SelectItem key={desig} value={desig}>{desig}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="employeeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Employee ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="e.g., E12345"
                                                    className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm placeholder-placeholder-light dark:placeholder-placeholder-dark focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm placeholder-placeholder-light dark:placeholder-placeholder-dark focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-medium">Contact Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Enter your phone number"
                                                    className="mt-1 block w-full px-3 py-2 bg-background-light dark:bg-background-dark border border-subtle-light dark:border-subtle-dark rounded-md shadow-sm placeholder-placeholder-light dark:placeholder-placeholder-dark focus:outline-none focus:ring-primary focus:border-primary text-sm text-text-light dark:text-text-dark"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

    