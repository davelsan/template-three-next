import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '../utils';

type TypographyH1Props = HTMLAttributes<HTMLHeadingElement> & {
  //
};

export function Heading1({
  children,
  className,
}: PropsWithChildren<TypographyH1Props>) {
  return (
    <h1 className={cn('scroll-m-20 text-4xl font-bold lg:text-5xl', className)}>
      {children}
    </h1>
  );
}
