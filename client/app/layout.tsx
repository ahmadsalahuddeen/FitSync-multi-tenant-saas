import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import localFont from '@next/font/local';
import '@/app/globals.css';
import { Toaster } from 'sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'FitSync',
  description: 'A complete gym management SaaS',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head></head>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
            fontHeading.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster richColors position='top-right' />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
