
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function SelectRolePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        // User is logged in, redirect to onboarding.
        router.push('/onboarding');
      } else {
        // User is not logged in, redirect to login page.
        router.push('/');
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="w-full min-h-screen grid place-items-center p-4 bg-[#0F1822] text-foreground">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
