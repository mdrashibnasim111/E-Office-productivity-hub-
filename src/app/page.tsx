
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Checkbox } from '@/components/ui/checkbox';

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
        <div className="w-full max-w-md rounded-lg border border-white/50 bg-black/20 p-8 shadow-2xl backdrop-blur-md">
          <div className="mx-auto flex flex-col items-center">
            <div className="grid gap-2 text-center text-white mb-5">
               <h2 className="text-3xl font-bold font-headline">Login Form</h2>
            </div>
            <form className="grid gap-4 w-full">
              <div className="relative my-4 border-b-2 border-white">
                <Input
                  id="email"
                  type="email"
                  required
                  defaultValue="manager@example.gov"
                  className="peer h-12 w-full border-none bg-transparent text-white placeholder-transparent focus:outline-none focus:ring-0 p-0"
                  placeholder="m@example.gov"
                />
                 <Label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:translate-y-0">Enter your email</Label>
              </div>
              <div className="relative my-4 border-b-2 border-white">
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  defaultValue="password"
                  className="peer h-12 w-full border-none bg-transparent text-white placeholder-transparent focus:outline-none focus:ring-0 p-0"
                  placeholder="password"
                 />
                <Label htmlFor="password"  className="absolute left-0 -top-3.5 text-sm text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:translate-y-0">Enter your password</Label>
              </div>
              <div className="flex items-center justify-between my-6">
                <div className="flex items-center">
                    <Checkbox id="remember" className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:text-black" />
                    <Label htmlFor="remember" className="text-sm font-medium text-white ml-2">Remember me</Label>
                </div>
                <Link
                  href="#"
                  className="inline-block text-sm text-white hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base" asChild>
                <Link href="/select-role">Log In</Link>
              </Button>
                <div className="mt-4 text-center text-sm text-white">
                Don't have an account?{' '}
                <Link href="#" className="underline">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
