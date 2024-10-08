import Link from 'next/link';

import { siteConfig } from '@/config/site.config';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '../images/Icons';
import { MainNav } from '@/components/navbar/MainNav';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className={buttonVariants({ size: 'icon', variant: 'ghost' })}>
                <Icons.gitHub className="size-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
