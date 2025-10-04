
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp'>('signIn');


  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/select-role');
    }
  }, [user, isUserLoading, router]);

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Authentication service is not available.',
      });
      return;
    }
    
    if (authMode === 'signUp' && password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: 'Passwords do not match.',
      });
      return;
    }

    setIsSigningIn(true);

    try {
        if (authMode === 'signIn') {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        // On success, the useEffect will handle the redirect.
    } catch (error: any) {
        let description = error.message || 'An unknown error occurred.';
        if (error.code === 'auth/email-already-in-use') {
            description = 'This email is already in use. Please sign in instead.';
        } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            description = 'Invalid email or password. Please try again.';
        }
        
        toast({
            variant: 'destructive',
            title: authMode === 'signIn' ? 'Sign-in Failed' : 'Sign-up Failed',
            description,
        });
    } finally {
        setIsSigningIn(false);
    }
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
      <div className="w-full min-h-screen grid place-items-center p-4 bg-[#0A0A0A] text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-display bg-[#0A0A0A] text-text-light">
        <div className="flex flex-col min-h-screen">
            <header className="border-b border-border-dark">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-black">
                                workspaces
                            </span>
                        </div>
                        <h1 className="text-xl font-bold text-white">e-Office</h1>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-[#162531] p-8 rounded-xl shadow-lg">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                            {authMode === 'signIn' ? 'Welcome Back' : 'Create an Account'}
                        </h2>
                        <p className="mt-2 text-center text-sm text-text-medium">
                            {authMode === 'signIn' ? 'Sign in to continue' : 'Enter your details to get started'}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleAuthAction}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <Label htmlFor="email-address" className="sr-only">Email address</Label>
                                <Input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="form-input appearance-none relative block w-full px-3 py-3 border border-input-border-dark bg-input-dark text-white placeholder:text-text-medium focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm rounded-lg"
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
                                    autoComplete={authMode === 'signIn' ? 'current-password' : 'new-password'}
                                    required
                                    className="form-input appearance-none relative block w-full px-3 py-3 border border-input-border-dark bg-input-dark text-white placeholder:text-text-medium focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm rounded-lg"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {authMode === 'signUp' && (
                                <div>
                                    <Label htmlFor="confirm-password"  className="sr-only">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="form-input appearance-none relative block w-full px-3 py-3 border border-input-border-dark bg-input-dark text-white placeholder:text-text-medium focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm rounded-lg"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        {authMode === 'signIn' && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-accent focus:ring-accent border-input-border-dark rounded bg-input-dark" />
                                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-text-light">
                                        Remember me
                                    </Label>
                                </div>
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-accent hover:text-accent/80">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        )}
                        <div>
                            <Button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-black bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-accent">
                                {authMode === 'signIn' ? 'Sign in' : 'Create Account'}
                            </Button>
                        </div>
                    </form>

                     <div className="text-center text-sm">
                        <span className="text-text-medium">
                            {authMode === 'signIn' ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button onClick={() => setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')} className="font-medium text-accent hover:text-accent/80">
                            {authMode === 'signIn' ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>


                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-border-dark"></div>
                        <span className="flex-shrink mx-4 text-text-medium">Or</span>
                        <div className="flex-grow border-t border-border-dark"></div>
                    </div>
                    <div>
                        <button onClick={handleGoogleSignIn} type="button" className="w-full inline-flex justify-center items-center py-3 px-4 border border-border-dark rounded-lg shadow-sm bg-input-dark text-sm font-medium text-text-light hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-accent">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );

    
    