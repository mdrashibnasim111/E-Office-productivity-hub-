
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirestore } from '@/firebase';
import { saveOnboardingData } from '@/firebase/firestore/mutations';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const departments = ['Finance', 'HR', 'IT', 'Public Works', 'Health', 'Education'];
const designations: Record<string, Record<string, string[]>> = {
    'Manager': {
        'Finance': ['Finance Manager', 'Accounts Manager'],
        'HR': ['HR Manager', 'Recruitment Manager'],
        'IT': ['IT Manager', 'Systems Manager'],
        'Public Works': ['Project Manager', 'Operations Manager'],
        'Health': ['Clinic Manager', 'Public Health Manager'],
        'Education': ['Program Manager', 'Admissions Manager'],
    },
    'Employee': {
        'Finance': ['Accountant', 'Financial Analyst'],
        'HR': ['HR Generalist', 'Recruiter'],
        'IT': ['Software Developer', 'IT Support Specialist'],
        'Public Works': ['Civil Engineer', 'Technician'],
        'Health': ['Nurse', 'Health Educator'],
        'Education': ['Teacher', 'Admissions Officer'],
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

export default function OnboardingPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: '',
      department: '',
      employeeId: '',
      fullName: user?.displayName || '',
      designation: '',
      contactPhone: user?.phoneNumber || '',
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

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (isUserLoading || !user) {
    return (
      <div className="w-full min-h-screen grid place-items-center p-4 bg-[#0F1822] text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1822] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Step {step} of 3: Please provide the following details to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Your Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Employee">Employee</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={nextStep} disabled={!selectedRole}>Next</Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                   <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Your Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep} disabled={!selectedDepartment}>Next</Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 12345" {...field} />
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
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a designation" />
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
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., +1 234 567 890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>Back</Button>
                    <Button type="submit">Complete Onboarding</Button>
                  </div>
                </div>
              )}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
