
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/icons/logo';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('manager@example.gov');
  const [password, setPassword] = useState('password');
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/select-role');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      const customEvent = event as CustomEvent;
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: customEvent.detail.message,
      });
    };

    window.addEventListener('auth-error', handleAuthError);

    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, [toast]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Authentication service is not available.',
      });
      return;
    }
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter both email and password.',
      });
      return;
    }
    initiateEmailSignIn(auth, email, password);
  };

  if (isUserLoading || (!isUserLoading && user)) {
    return (
        <div className="w-full min-h-screen grid place-items-center p-4 bg-[#0F1822] text-foreground">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p>Loading...</p>
            </div>
        </div>
    );
  }


  return (
    <div className="w-full min-h-screen grid place-items-center p-4 bg-[#0F1822] relative overflow-hidden">
      <div className="w-full max-w-[300px] rounded-lg bg-card/30 border border-primary/20 backdrop-blur-lg p-8 shadow-2xl text-foreground flex flex-col items-center text-center z-10">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <Logo className="h-[74px] w-[74px] text-primary mb-4" />
          <div className="grid gap-1.5 text-center mb-6">
              <h2 className="text-2xl font-medium font-headline">Welcome to e-Office</h2>
              <h3 className="text-muted-foreground text-xs font-medium">Lightning quick productivity!</h3>
          </div>
          <form className="grid gap-3 w-full mb-6" onSubmit={handleLogin}>
            <div className="relative">
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer h-[56px] w-full border-0 rounded-lg bg-input pt-2.5 text-base text-foreground placeholder-transparent ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow duration-300"
                placeholder="m@example.gov"
              />
              <Label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-3.5 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary peer-valid:top-3.5 peer-valid:-translate-y-1/2 peer-valid:scale-75 peer-valid:text-primary">Email</Label>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer h-[56px] w-full border-0 rounded-lg bg-input pt-2.5 text-base text-foreground placeholder-transparent ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-shadow duration-300"
                placeholder="password"
                />
              <Label htmlFor="password"  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-3.5 peer-focus:-translate-y-1/2 peer-focus:scale-75 peer-focus:text-primary peer-valid:top-3.5 peer-valid:-translate-y-1/2 peer-valid:scale-75 peer-valid:text-primary">Password</Label>
            </div>
            
            <Button type="submit" className="relative w-full bg-primary text-lg text-primary-foreground font-semibold h-[56px] py-3 px-5 rounded-lg transition-all duration-300 ease-in-out hover:bg-primary/80 mt-2 overflow-hidden group">
                <span className="transition-all duration-300 group-hover:-translate-x-4">Login</span>
                <ArrowRight className="absolute top-1/2 left-1/2 h-6 w-6 opacity-0 -translate-y-1/2 translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-8" />
            </Button>
          </form>
            <Link
                href="#"
                className="inline-block text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>

              <div className="mt-6 text-center text-sm text-muted-foreground">
              Not a member yet?{' '}
              <Link href="#" className="underline hover:text-primary font-semibold">
                Sign up!
              </Link>
            </div>
        </div>
      </div>
       <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}
