import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Pricing',
};

export default function PricingPage() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Pricing that reflects how many customers you have
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Pay for how many active customers you have per month, not which
          features you need.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="grid w-full items-end gap-10 rounded-lg border p-10 ">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">Starter 100</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-1 ">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> 0-100 members
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Full features for
                everyone.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$49</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
          </div>
        </div>
        <div className="grid w-full items-end gap-10 rounded-lg border p-10 ">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">Accelarate 300</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-1 ">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> upto 300 members
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Full features for
                everyone.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$129</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
          </div>
        </div>
        <div className="grid w-full items-end gap-10 rounded-lg border p-10 ">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">Ultimate 600</h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-1 ">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> upto 600 members
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Full features for
                everyone.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$229</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      
      <div className=" w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            Full features for everyone. 
            Never get upsold.
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> See detailed business
              reports
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Get full support
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Don&apos;t pay until
              you&apos;re sure, Explore Free Trial
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Dashboard Analytics
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Full access to all
              features:
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Online payments
            </li>
          </ul>
        </div>
       
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            More Than 600+ Members? <br />Explore Enterprise 
          </h3>
         
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
           
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
            Contact
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          FitSync is in currently in a Test mode.{' '}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  );
}
