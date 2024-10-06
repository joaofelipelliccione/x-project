'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Icons } from '../images/Icons';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Icons.sun className="h-6 w-[1.3rem] dark:hidden" />
      <Icons.moon className="hidden size-5 dark:block" />
    </Button>
  );
}
