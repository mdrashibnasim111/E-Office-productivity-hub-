
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
    <div className="w-full min-h-screen grid place-items-center p-4">
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
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <Logo className="h-[74px] w-[74px] text-primary mb-8" />
          <div className="grid gap-1.5 text-center mb-14">
              <h2 className="text-2xl font-medium">Welcome to e-Office</h2>
              <h3 className="text-muted-foreground text-xs font-medium">Lightning quick productivity!</h3>
          </div>
          <form className="grid gap-3 w-full mb-8">
            <div className="relative">
              <Input
                id="email"
                type="email"
                required
                defaultValue="manager@example.gov"
                className="peer h-[56px] w-full border-0 rounded-lg bg-[#251930] pt-2.5 text-foreground placeholder-transparent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_hsl(var(--primary))]"
                placeholder="m@example.gov"
              />
              <Label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-0 peer-focus:translate-y-[10px] peer-focus:text-xs peer-focus:text-primary">Email</Label>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
                className="peer h-[56px] w-full border-0 rounded-lg bg-[#251930] pt-2.5 text-foreground placeholder-transparent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_hsl(var(--primary))]"
                placeholder="password"
                />
              <Label htmlFor="password"  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:-top-0 peer-focus:translate-y-[10px] peer-focus:text-xs peer-focus:text-primary">Password</Label>
            </div>
            
              <Button type="submit" className="w-full bg-primary text-primary-foreground font-semibold h-[56px] py-3 px-5 rounded-lg text-base transition-all duration-300 ease-in-out hover:bg-primary/80 mt-4 flex justify-between items-center" asChild>
              <Link href="/select-role">
                  <span>Login</span>
                  <ArrowRight className="h-5 w-5" />
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
