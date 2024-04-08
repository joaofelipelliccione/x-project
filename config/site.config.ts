export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'X Project',
  description: 'Next.js template',
  mainNav: [
    { title: 'Next.js', href: 'https://nextjs.org/' },
    { title: 'shadcn/ui', href: 'https://ui.shadcn.com/' },
    { title: 'Tailwind', href: 'https://tailwindcss.com/' },
    { title: 'Lucide', href: 'https://lucide.dev/guide/' },
    { title: 'Jest', href: 'https://nextjs.org/docs/app/building-your-application/testing/jest' },
  ],
  links: {
    twitter: 'https://twitter.com/jfpelliccione',
    github: 'https://github.com/joaofelipelliccione',
    docs: 'https://github.com/joaofelipelliccione/x-project',
  },
};
