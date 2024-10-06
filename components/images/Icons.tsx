import { Heart, Moon, SunMedium, Pencil, CircleAlert, MoveRight, Github } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const iconVariants = cva('shrink-0', {
  variants: { size: { xs: 'size-4', sm: 'size-6', md: 'size-12' } },
  defaultVariants: { size: 'sm' },
});

interface IconProps
  extends React.ComponentPropsWithoutRef<'svg'>,
    VariantProps<typeof iconVariants> {}

const Icon = ({ SVG, className, size, ...props }: IconProps & { SVG: React.ElementType }) => (
  <SVG
    width={undefined}
    height={undefined}
    className={iconVariants({ size, className })}
    {...props}
  />
);

export const Icons = {
  sun: (props: IconProps) => <Icon {...props} SVG={SunMedium} />,
  moon: (props: IconProps) => <Icon {...props} SVG={Moon} />,
  heart: (props: IconProps) => <Icon {...props} SVG={Heart} />,
  pencil: (props: IconProps) => <Icon {...props} SVG={Pencil} />,
  circleAlert: (props: IconProps) => <Icon {...props} SVG={CircleAlert} />,
  moveRight: (props: IconProps) => <Icon {...props} SVG={MoveRight} />,
  gitHub: (props: IconProps) => <Icon {...props} SVG={Github} />,
};
