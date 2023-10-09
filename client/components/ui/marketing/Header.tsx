'use client';
import Link from 'next/link';
import Container from '../container';
import { Button } from '../button';
import { Dumbbell, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import { Icons } from '@/components/icons';

const routes = [
  {
    href: '/#features',
    label: 'Features',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
  {
    href: '/pricing',
    label: 'Documentation',
  },
];

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 ">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full">
          {/* store name */}
          <div className="flex items-center">

            {/* mobile navbar              */}
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 w-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400]">
                <nav className="flex flex-col gap-4 pt-5">
                  {routes.map((route, i) => (
                    <Button className="justify-start" asChild variant="ghost">
                      <Link
                        key={i}
                        href={route.href}
                        className=" text-lg px-2 py-1 block"
                      >
                        {route.label}
                      </Link>
                    </Button>
                  ))}
                  <Button className="mt-4 " size="sm" asChild variant="secondary">
                <Link
                  href="signin"
                  className=" text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              </Button>
                </nav>
              </SheetContent>
            </Sheet>


            <Link href="/ " className="ml-4 lg:ml-0">
            <div className="flex ">
      <Dumbbell className="mr-2  rotate-90 text-lime-600" 

      />
      <h1 className="text-xl font-sans font-semibold">FitSync</h1>
    </div>
            </Link>
          </div>

          {/* NavMenu */}
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button asChild variant="ghost">
                <Link
                  key={i}
                  href={route.href}
                  className=" text-sm text-slate-500 font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
            
          </nav>

          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-2"
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>

            {/* TODO display "console"  instead of signin if use is loggedin  */}
            <div className="hidden md:block">
              <Button className="mr-6 " size="sm" asChild variant="secondary">
                <Link
                  href="signin"
                  className=" text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              </Button>
            </div>

            <Button className="mr-2" size="sm" asChild variant="default">
              <Link
                href="signin"
                className=" text-sm font-medium transition-colors"
              >
                Try It Free
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
