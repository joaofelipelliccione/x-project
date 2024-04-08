import '@/styles/globals.css';
import { Metadata } from 'next';

import { siteConfig } from '@/config/site.config';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/navbar/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
