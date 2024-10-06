import '@/styles/globals.css';
import { Metadata } from 'next';

import { siteConfig } from '@/config/site.config';
import { fontSans, fontMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/navbar/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Providers } from '@/providers/Providers';

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico', shortcut: '/favicon-16x16.png', apple: '/apple-touch-icon.png' },
  title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
    description: siteConfig.description,
    images: [
      { url: '/open-graph-image.png', width: 1200, height: 630, alt: `Imagem ${siteConfig.name}` },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="pt-br" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'bg-background min-h-screen font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
