import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  weight: ['300', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
});
