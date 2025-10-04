
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
      <div className="w-full min-h-screen grid place-items-center p-4 bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-accent" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-card-foreground tracking-tight">Productivity Management Module</h1>
          <p className="text-muted-foreground mt-1">
            {authMode === 'signIn' ? 'Sign in to your e-Office account' : 'Create your e-Office account'}
          </p>
        </div>
        <div className="bg-card rounded-xl shadow-sm border p-6 space-y-6">
          <form className="space-y-4" onSubmit={handleAuthAction}>
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="email">Email</Label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">mail</span>
                <Input
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-muted-foreground transition duration-150 ease-in-out"
                  id="email"
                  placeholder="you@example.gov"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1" htmlFor="password">Password</Label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">lock</span>
                <Input
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-muted-foreground transition duration-150 ease-in-out"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {authMode === 'signUp' && (
                <div>
                    <Label className="block text-sm font-medium mb-1" htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">lock</span>
                        <Input
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-muted-foreground transition duration-150 ease-in-out"
                            id="confirm-password"
                            placeholder="••••••••"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
            )}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background transition duration-150 ease-in-out"
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <Loader2 className="animate-spin" />
              ) : authMode === 'signIn' ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t"></div>
            <span className="flex-shrink mx-4 text-muted-foreground">Or</span>
            <div className="flex-grow border-t"></div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path>
            </svg>
            Continue with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {authMode === 'signIn' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')} className="font-semibold text-accent hover:underline">
              {authMode === 'signIn' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Powered by <span className="font-semibold text-foreground">e-Office</span>
        </p>
      </div>
    </main>
  );
}
