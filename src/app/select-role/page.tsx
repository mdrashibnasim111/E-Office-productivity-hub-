
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser, useDoc, useFirestore, useMemoFirebase, type AppUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export default function SelectRolePage() {
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(
    () => (user && firestore ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  
  const { data: userData, isLoading: isUserDocLoading } = useDoc(userDocRef);

  useEffect(() => {
    // Wait until both authentication and user document loading are complete
    if (isAuthLoading || isUserDocLoading) {
      return;
    }

    if (!user) {
      // If no user is authenticated, send them to the login page.
      router.push('/');
      return;
    }

    if (userData && userData.onboarded) {
      // User is onboarded, redirect based on role from custom claim.
      if ((user as AppUser).role === 'Manager') {
        router.push('/dashboard');
      } else {
        // Default to employee view (tasks page) for any other role.
        router.push('/dashboard/tasks');
      }
    } else {
      // User is not yet onboarded or data is missing, redirect to onboarding.
      router.push('/onboarding');
    }
  }, [user, userData, isAuthLoading, isUserDocLoading, router]);

  // Display a loading indicator while we determine the user's status.
  return (
    <div className="w-full min-h-screen grid place-items-center p-4 bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p>Routing...</p>
      </div>
    </div>
  );
}
