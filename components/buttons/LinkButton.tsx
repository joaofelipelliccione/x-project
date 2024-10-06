import Link from 'next/link';
import { Button, ButtonProps } from '../ui/button';

interface Props extends ButtonProps {
  href: string;
  openInNewTab?: boolean;
}

export default function LinkButton({
  href,
  openInNewTab = true,
  className,
  children,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
    >
      <Button {...props}> {children}</Button>
    </Link>
  );
}
