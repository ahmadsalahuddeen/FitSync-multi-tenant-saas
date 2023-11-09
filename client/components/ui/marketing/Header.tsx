"use client";
import Link from "next/link";
import Container from "../container";
import { Button } from "../button";
import { Dumbbell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { Icons } from "@/components/icons";
import { signIn, useSession } from "next-auth/react";

const routes = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "/pricing",
    label: "Documentation",
  },
];

function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <header className="px-4 py-3 sm:flex sm:justify-between ">
      <Container>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
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
                    <Button
                      key={i}
                      className="justify-start"
                      asChild
                      variant="ghost"
                    >
                      <Link
                        href={route.href}
                        className=" block px-2 py-1 text-lg"
                      >
                        {route.label}
                      </Link>
                    </Button>
                  ))}
                  {session?.user && (
                    <Button
                      className="mt-4 "
                      size="sm"
                      asChild
                      variant="secondary"
                    >
                      <Link
                        href="/auth/signup"
                        className=" text-sm font-medium transition-colors"
                        onClick={() => signIn()}
                      >
                        Login
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/ " className="ml-4 lg:ml-0">
              <div className="flex ">
                <Dumbbell className="mr-2  rotate-90 text-lime-600" />
                <h1 className="font-sans text-xl font-semibold">FitSync</h1>
              </div>
            </Link>
          </div>

          {/* NavMenu */}
          <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
            {routes.map((route, i) => (
              <Button key={i} asChild variant="ghost">
                <Link
                  href={route.href}
                  className=" text-sm font-medium text-slate-500 transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* conditional auth and dashbaord button */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-2"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
              {session?.user && (
            <div className="hidden md:block">
                <Button className="mr-6 " size="sm" asChild variant="secondary">
                  <Link
                    href="/auth/signin"
                    className=" text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                </Button>
            </div>
              )}
            <Button className="mr-2" size="sm" asChild variant="default">

              {session && session.user ? (
                <Link
                  href="/dashboard"
                  className=" text-sm font-medium transition-colors"
                >
                  Go to Dashoard
                </Link>
              ) : (
                <Link
                  href="/auth/signup"
                  className=" text-sm font-medium transition-colors"
                >
                  Try It Free
                </Link>
              )}
            </Button>
          </div>


        </div>
      </Container>
    </header>
  );
}

export default Header;
