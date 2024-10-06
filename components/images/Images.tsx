import Logo from '@/assets/SVG/logo.svg';

type ImageProps = React.ComponentPropsWithoutRef<'svg'>;

const CustomImage = ({ SVG, ...props }: ImageProps & { SVG: React.ElementType }) => (
  <SVG width={undefined} height={undefined} {...props} />
);

export const Images = {
  logo: (props: ImageProps) => <CustomImage {...props} SVG={Logo} />,
};
