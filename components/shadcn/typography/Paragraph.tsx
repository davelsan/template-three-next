import { HTMLAttributes, PropsWithChildren } from 'react';

import { cn } from '@shadcn/utils';

interface TypographyPProps extends HTMLAttributes<HTMLParagraphElement> {}

export function Paragraph({
  children,
  className,
  ...props
}: PropsWithChildren<TypographyPProps>) {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    >
      {children}
    </p>
  );
}
