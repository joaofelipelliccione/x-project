import { siteConfig } from '@/config/site.config';
import { Icons } from '@/components/images/Icons';
import { StandardCarousel } from '@/components/StandardCarousel';
import LinkButton from '@/components/buttons/LinkButton';

export default function IndexPage() {
  return (
    <section className="container pb-8 pt-6 md:py-10">
      <div className="flex flex-col justify-between bg-red-400 sm:flex-row">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Web App Template
          </h1>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Made with <Icons.heart className="inline size-4 fill-current" /> by João Felipe P
          </p>
        </div>
        <LinkButton
          variant="default"
          href={siteConfig.links.docs}
          openInNewTab
          className="mt-4 max-w-[180px] sm:mt-0 sm:self-center"
        >
          Github Repository
        </LinkButton>
      </div>
      <div className="mt-6 flex">
        <StandardCarousel />
      </div>
    </section>
  );
}
