
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn, initiateEmailSignUp } from '@/firebase/non-blocking-login';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/select-role');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const handleAuthError = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsSigningIn(false);
      // If login fails, try to sign up the user.
      if (customEvent.detail?.code === 'auth/invalid-credential' || customEvent.detail?.code === 'auth/user-not-found') {
        if(auth) {
          initiateEmailSignUp(auth, email, password);
        }
      } else {
         toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: customEvent.detail?.message || 'An unknown error occurred.',
        });
      }
    };

    window.addEventListener('auth-error', handleAuthError);

    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, [toast, auth, email, password]);

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
    setIsSigningIn(true);
    initiateEmailSignIn(auth, email, password);
  };
  
  const handleGoogleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      setIsSigningIn(true);
      await signInWithPopup(auth, provider);
      // Let the useEffect handle the redirect
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: "Could not sign in with Google. Please try again.",
      });
    } finally {
        setIsSigningIn(false);
    }
  };

  if (isUserLoading || (!isUserLoading && user) || isSigningIn) {
    return (
      <div className="w-full min-h-screen grid place-items-center p-4 bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-display bg-background-dark text-text-light">
        <div className="flex flex-col min-h-screen">
            <header className="border-b border-border-dark">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-accent">
                                workspaces
                            </span>
                        </div>
                        <h1 className="text-xl font-bold text-white">e-Office</h1>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-card-dark p-8 rounded-xl shadow-lg">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                            Welcome to e-Office
                        </h2>
                        <p className="mt-2 text-center text-sm text-text-medium">
                            Sign in to continue your work
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <Label htmlFor="email-address" className="sr-only">Email address</Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="form-input appearance-none rounded-none relative block w-full px-3 py-3 border border-input-border-dark bg-input-dark text-white placeholder:text-text-medium focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-t-lg"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password"  className="sr-only">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="form-input appearance-none rounded-none relative block w-full px-3 py-3 border border-input-border-dark bg-input-dark text-white placeholder:text-text-medium focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm rounded-b-lg"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-input-border-dark rounded bg-input-dark" />
                                <Label htmlFor="remember-me" className="ml-2 block text-sm text-text-light">
                                    Remember me
                                </Label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary hover:text-primary/80">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-black bg-primary-accent hover:bg-primary-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary-accent">
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-border-dark"></div>
                        <span className="flex-shrink mx-4 text-text-medium">Or sign in with</span>
                        <div className="flex-grow border-t border-border-dark"></div>
                    </div>
                    <div>
                        <button onClick={handleGoogleSignIn} type="button" className="w-full inline-flex justify-center items-center py-3 px-4 border border-border-dark rounded-lg shadow-sm bg-input-dark text-sm font-medium text-text-light hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-primary">
                             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 5.234c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.577.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}
