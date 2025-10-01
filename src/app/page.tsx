
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
    <div className="w-full min-h-screen grid place-items-center">
       {loginImage && (
          <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            className="object-cover fixed z-[-1]"
            data-ai-hint={loginImage.imageHint}
          />
        )}
      <div className="w-full max-w-[380px] rounded-[40px] bg-card/25 p-8 shadow-2xl backdrop-blur-xl text-foreground flex flex-col items-center text-center">
        <div className="mx-auto flex flex-col items-center text-center">
          <Logo className="h-16 w-16 text-primary mb-8" />
          <div className="grid gap-1.5 text-center mb-14">
              <h2 className="text-2xl font-medium">Welcome to e-Office</h2>
              <h3 className="text-muted-foreground text-xs font-medium">Lightning quick productivity!</h3>
          </div>
          <form className="grid gap-3 w-full mb-8">
            <div className="relative my-4 border-b-2 border-muted/50 focus-within:border-primary transition-colors duration-300">
              <Input
                id="email"
                type="email"
                required
                defaultValue="manager@example.gov"
                className="peer h-10 w-full border-none bg-transparent p-0 text-foreground placeholder-transparent focus:outline-none focus:ring-0"
                placeholder="m@example.gov"
              />
                <Label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-foreground">Email</Label>
            </div>
            <div className="relative my-4 border-b-2 border-muted/50 focus-within:border-primary transition-colors duration-300">
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
                className="peer h-10 w-full border-none bg-transparent p-0 text-foreground placeholder-transparent focus:outline-none focus:ring-0"
                placeholder="password"
                />
              <Label htmlFor="password"  className="absolute left-0 -top-3.5 text-sm text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-foreground">Password</Label>
            </div>
            
              <Button type="submit" className="w-full bg-primary text-primary-foreground font-semibold h-auto py-3 px-5 rounded-md text-base transition-all duration-300 ease-in-out hover:bg-primary/80 mt-4" asChild>
              <Link href="/select-role">
                  Login
                  <ArrowRight className="ml-auto h-5 w-5" />
              </Link>
            </Button>
          </form>
            <Link
                href="#"
                className="inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                Forgot password?
              </Link>

              <div className="mt-8 text-center text-sm text-muted-foreground">
              Not a member yet?{' '}
              <Link href="#" className="underline hover:text-foreground font-semibold">
                Sign up!
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
