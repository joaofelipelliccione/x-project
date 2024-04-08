import Link from 'next/link';

import { siteConfig } from '@/config/site.config';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icon';

export default function IndexPage() {
  return (
    <section className="container pb-8 pt-6 md:py-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Web App Template
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Made with <Icons.heart className="inline size-4 fill-current" /> by João Felipe P
          </p>
        </div>

        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ size: 'lg' })}
        >
          Github Repository
        </Link>
      </div>
    </section>
  );
}

//
