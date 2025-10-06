
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirestore } from '@/firebase';
import { saveOnboardingData } from '@/firebase/firestore/mutations';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    },
    'Admin': {
        'IT': ['System Administrator', 'Database Administrator', 'Network Administrator']
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

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
    <div className="flex items-center justify-center space-x-2 py-8 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => (
             <div className="flex items-center" key={index}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold transition-colors duration-300 ${
                    index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                    {index + 1}
                </div>
                {index < totalSteps - 1 && (
                    <div className="w-12 h-[2px] bg-border ml-2" />
                )}
            </div>
        ))}
    </div>
);

const StepLayout = ({ title, description, children }: { title: string, description: string, children: ReactNode }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };
    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, type: "spring" }}
            className="text-center"
        >
            <h2 className="text-3xl font-bold text-card-foreground mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="mt-8">{children}</div>
        </motion.div>
    );
}

export default function OnboardingPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [language, setLanguage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<OnboardingFormValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            role: '', department: '', otherDepartment: '', employeeId: '',
            fullName: '', designation: '', contactPhone: '',
        },
    });
    const { watch, setValue } = form;
    const selectedRole = watch('role');
    const selectedDepartment = watch('department');

    useEffect(() => {
        if (!isUserLoading && !user) router.push('/');
    }, [user, isUserLoading, router]);

    useEffect(() => {
        if (user && !isUserLoading) {
            setValue('fullName', user.displayName || '');
            setValue('contactPhone', user.phoneNumber || '');
        }
    }, [user, isUserLoading, setValue]);

    const handleNext = async () => {
        setIsLoading(true);
        let isValid = true;
        if (currentStep === 1 && !language) {
            toast({ variant: 'destructive', title: 'Language Required', description: 'Please select a language.' });
            isValid = false;
        } else if (currentStep === 2) {
            isValid = await form.trigger();
            if (isValid) onSubmit(form.getValues());
        }

        if (isValid) {
            if (currentStep === 3) {
                 router.push('/dashboard');
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
        setIsLoading(false);
    };

    const onSubmit = (data: OnboardingFormValues) => {
        if (!user || !firestore) {
            toast({ variant: "destructive", title: "Error", description: "User not authenticated." });
            return;
        }
        const finalData = {
            ...data,
            department: data.department === 'Other' ? data.otherDepartment! : data.department
        };
        saveOnboardingData(firestore, user, finalData);
        toast({ title: "Onboarding Complete!", description: "Your profile has been saved." });
    };

    if (isUserLoading || !user) {
        return (
            <div className="w-full min-h-screen grid place-items-center p-4 bg-background text-foreground">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    const totalSteps = 4;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col justify-center px-6 pt-8">
                <div className="text-center mb-10">
                    <h1 className="text-2xl font-bold text-card-foreground">e-Office</h1>
                </div>
                <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
                <AnimatePresence mode="wait">
                    <div key={currentStep} className="mb-8">
                        {currentStep === 0 && (
                            <StepLayout title="Welcome to e-Office" description="Let's get your profile set up. It'll only take a minute." />
                        )}
                        {currentStep === 1 && (
                            <StepLayout title="Select Your Language" description="Choose your preferred language for the application.">
                                <div className="max-w-sm mx-auto">
                                    <Select onValueChange={setLanguage} value={language}>
                                        <SelectTrigger className="py-3 text-base">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {languages.map(lang => (
                                                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </StepLayout>
                        )}
                        {currentStep === 2 && (
                            <StepLayout title="Complete Your Profile" description="Provide your details to finish setup.">
                                <div className="max-w-lg mx-auto bg-card p-6 sm:p-8 rounded-lg border">
                                    <Form {...form}>
                                        <form className="space-y-4 text-left">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="role" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Role</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl><SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger></FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Employee">Employee</SelectItem>
                                                                <SelectItem value="Manager">Manager</SelectItem>
                                                                <SelectItem value="Admin">Admin</SelectItem>
                                                            </SelectContent>
                                                        </Select><FormMessage />
                                                    </FormItem>
                                                )}/>
                                                <FormField control={form.control} name="department" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Department</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole}>
                                                            <FormControl><SelectTrigger><SelectValue placeholder="Select Dept" /></SelectTrigger></FormControl>
                                                            <SelectContent>{departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}</SelectContent>
                                                        </Select><FormMessage />
                                                    </FormItem>
                                                )}/>
                                            </div>
                                            {selectedDepartment === 'Other' && (
                                                <FormField control={form.control} name="otherDepartment" render={({ field }) => (
                                                    <FormItem><FormLabel>Specify Department</FormLabel><FormControl><Input placeholder="Enter department name" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            )}
                                            <FormField control={form.control} name="designation" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Designation</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRole || !selectedDepartment || selectedDepartment === 'Other'}>
                                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Designation" /></SelectTrigger></FormControl>
                                                        <SelectContent>{selectedRole && selectedDepartment && designations[selectedRole]?.[selectedDepartment]?.map(desig => (<SelectItem key={desig} value={desig}>{desig}</SelectItem>))}</SelectContent>
                                                    </Select><FormMessage />
                                                </FormItem>
                                            )}/>
                                            <FormField control={form.control} name="fullName" render={({ field }) => (
                                                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="employeeId" render={({ field }) => (
                                                    <FormItem><FormLabel>Employee ID</FormLabel><FormControl><Input placeholder="e.g., E12345" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="contactPhone" render={({ field }) => (
                                                    <FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input placeholder="Enter phone number" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </StepLayout>
                        )}
                        {currentStep === 3 && (
                            <StepLayout title="All Set!" description="You're ready to go. Proceed to your dashboard to get started." />
                        )}
                    </div>
                </AnimatePresence>
            </main>
            <div className="px-6 pb-8 mt-auto">
                <Button onClick={handleNext} disabled={isLoading} className="w-full bg-primary text-primary-foreground font-bold py-4 px-5 rounded-lg text-lg hover:bg-primary/90 active:bg-primary/80 transition-colors">
                    {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {currentStep === 0 ? "Get Started" : currentStep === 3 ? "Go to Dashboard" : "Continue"}
                </Button>
            </div>
        </div>
    );
}
