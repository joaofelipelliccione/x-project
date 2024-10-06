import * as React from 'react';
import Link from 'next/link';

import { NavItem } from '@/components/types/nav.type';
import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/utils';
import { Images } from '../images/Images';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Images.logo className="size-8 fill-current" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-muted-foreground flex items-center text-sm font-medium',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
