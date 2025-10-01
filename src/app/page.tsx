
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Logo from '@/components/icons/logo';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const loginImage = PlaceHolderImages.find(image => image.id === 'login-image');

  return (
    <div className="relative w-full min-h-screen">
       {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            className="object-cover"
            data-ai-hint={loginImage.imageHint}
          />
        )}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border border-white/50 bg-black/20 p-8 shadow-2xl backdrop-blur-md text-white">
          <div className="mx-auto flex flex-col items-center text-center">
            <Logo className="h-12 w-12 text-primary" />
            <div className="grid gap-1 text-center text-white my-6">
               <h2 className="text-3xl font-bold font-headline">Welcome Back</h2>
               <h3 className="text-muted-foreground">Lightning quick productivity!</h3>
            </div>
            <form className="grid gap-4 w-full">
              <div className="relative my-4 border-b-2 border-white/50 focus-within:border-white transition-colors duration-300">
                <Input
                  id="email"
                  type="email"
                  required
                  defaultValue="manager@example.gov"
                  className="peer h-10 w-full border-none bg-transparent p-0 text-white placeholder-transparent focus:outline-none focus:ring-0"
                  placeholder="m@example.gov"
                />
                 <Label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">Email</Label>
              </div>
              <div className="relative my-4 border-b-2 border-white/50 focus-within:border-white transition-colors duration-300">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  defaultValue="password"
                  className="peer h-10 w-full border-none bg-transparent p-0 text-white placeholder-transparent focus:outline-none focus:ring-0"
                  placeholder="password"
                 />
                <Label htmlFor="password"  className="absolute left-0 -top-3.5 text-sm text-white/80 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-white">Password</Label>
              </div>
              
               <Button type="submit" className="w-full bg-white text-black font-semibold h-auto py-3 px-5 rounded-md text-base border-2 border-transparent transition-all duration-300 ease-in-out hover:text-white hover:border-white hover:bg-white/15 mt-4" asChild>
                <Link href="/select-role">
                    Login
                    <ArrowRight className="ml-auto h-5 w-5" />
                </Link>
              </Button>

                <Link
                  href="#"
                  className="inline-block text-sm text-white/80 hover:text-white hover:underline mt-2"
                >
                  Forgot password?
                </Link>

                <div className="mt-8 text-center text-sm text-white/80">
                Not a member yet?{' '}
                <Link href="#" className="underline hover:text-white font-semibold">
                  Sign up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
