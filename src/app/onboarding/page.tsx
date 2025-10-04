
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
import Stepper, { Step } from '@/components/ui/stepper';
import { Label } from '@/components/ui/label';

const departments = ['Finance', 'HR', 'IT', 'Public Works', 'Health', 'Education', 'Operations', 'Other'];
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

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'hi', label: 'हिन्दी (Hindi)' },
    { value: 'zh', label: '中文 (Mandarin)' },
    { value: 'ja', label: '日本語 (Japanese)' },
    { value: 'ko', label: '한국어 (Korean)' },
    { value: 'ru', label: 'Русский (Russian)' },
    { value: 'pt', label: 'Português' },
    { value: 'ar', label: 'العربية (Arabic)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'id', label: 'Bahasa Indonesia' },
];

const onboardingSchema = z.object({
  role: z.string().min(1, "Role is required."),
  department: z.string().min(1, "Department is required."),
  otherDepartment: z.string().optional(),
  employeeId: z.string().min(1, "Employee ID is required."),
  fullName: z.string().min(1, "Full Name is required."),
  designation: z.string().min(1, "Designation is required."),
  contactPhone: z.string().min(1, "Contact phone is required."),
}).refine(data => {
    if (data.department === 'Other') {
        return !!data.otherDepartment && data.otherDepartment.length > 0;
    }
    return true;
}, {
    message: "Please specify your department",
    path: ["otherDepartment"],
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;
const managerAvatar = PlaceHolderImages.find(i => i.id === 'avatar-manager');

export default function OnboardingPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [language, setLanguage] = useState('');

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: '',
      department: '',
      otherDepartment: '',
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
    if (user && !isUserLoading) {
      setValue('fullName', user.displayName || '');
      setValue('contactPhone', user.phoneNumber || '');
    }
  }, [user, isUserLoading, setValue]);

  const onSubmit = (data: OnboardingFormValues) => {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated or Firestore not available.",
      });
      return false; // Indicate failure
    }
    
    const finalData = {
        ...data,
        department: data.department === 'Other' ? data.otherDepartment! : data.department
    };

    saveOnboardingData(firestore, user, finalData);
    
    toast({
      title: "Onboarding Complete!",
      description: "Your profile has been saved.",
    });

    return true; // Indicate success
  };

  if (isUserLoading || !user) {
    return (
      <div className="w-full min-h-screen grid place-items-center p-4 bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-display text-foreground">
        <div className="flex flex-col min-h-screen">
            <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="text-accent">
                                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-4.3l8-5.7v-2l-8 5.7l-8-5.7v2l8 5.7Z"></path></svg>
                            </div>
                            <h1 className="text-xl font-bold">e-Office</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="flex items-center justify-center size-10 rounded-full bg-muted">
                                    <span className="material-symbols-outlined text-accent">notifications</span>
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
              <div className="w-full max-w-2xl">
                 <Stepper
                    initialStep={0}
                    onFinalStepCompleted={() => router.push('/dashboard')}
                    backButtonText="Previous"
                    nextButtonText="Next"
                    onStepChange={(step) => console.log(step)}
                    validateStep={async (step) => {
                      if (step === 2) {
                         const isValid = await form.trigger();
                         if(isValid) {
                            return onSubmit(form.getValues());
                         }
                         return false;
                      }
                      if (step === 1) {
                        if (!language) {
                            toast({
                                variant: 'destructive',
                                title: 'Language Required',
                                description: 'Please select a language to continue.'
                            });
                            return false;
                        }
                      }
                      return true;
                    }}
                >
                    <Step>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight">Welcome to the E-Office!</h2>
                            <p className="mt-2 text-muted-foreground">
                                Let's get your profile set up. It'll only take a minute.
                            </p>
                        </div>
                    </Step>
                    <Step>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold tracking-tight">Select Your Language</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Choose your preferred language for the application interface.
                            </p>
                        </div>
                        <div className="bg-card p-8 shadow-sm border rounded-lg max-w-sm mx-auto space-y-2">
                            <Label>Language</Label>
                            <Select onValueChange={setLanguage} value={language}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </Step>
                    <Step>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold tracking-tight">Complete Your Profile</h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Please provide the following information to set up your account.
                            </p>
                        </div>
                        <div className="bg-card p-8 shadow-sm border rounded-lg">
                            <Form {...form}>
                                <form className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
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
                                                <FormLabel>Department</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole}>
                                                    <FormControl>
                                                        <SelectTrigger>
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
                                    {selectedDepartment === 'Other' && (
                                        <FormField
                                            control={form.control}
                                            name="otherDepartment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Please Specify Department</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your department" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                    <FormField
                                        control={form.control}
                                        name="designation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Designation</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole || !selectedDepartment}>
                                                    <FormControl>
                                                        <SelectTrigger>
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                          control={form.control}
                                          name="employeeId"
                                          render={({ field }) => (
                                              <FormItem>
                                                  <FormLabel>Employee ID</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          type="text"
                                                          placeholder="e.g., E12345"
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
                                                  <FormLabel>Full Name</FormLabel>
                                                  <FormControl>
                                                      <Input
                                                          type="text"
                                                          placeholder="Enter your full name"
                                                          {...field}
                                                      />
                                                  </FormControl>
                                                  <FormMessage />
                                              </FormItem>
                                          )}
                                      />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="contactPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your phone number"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                    </Step>
                    <Step>
                      <div className="text-center">
                          <h2 className="text-3xl font-bold tracking-tight">All Set!</h2>
                          <p className="mt-2 text-muted-foreground">
                              You're ready to go. Click the button below to proceed to your dashboard.
                          </p>
                      </div>
                    </Step>
                </Stepper>
              </div>
            </main>
        </div>
    </div>
  );
}

    