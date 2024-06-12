import { cva, VariantProps } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

import { cn } from '@shadcn/utils';

const paragraphCss = cva(['[&:not(:first-child)]:mt-6'], {
  variants: {
    size: {
      small: 'text-sm leading-3',
      medium: 'text-base leading-7',
      large: 'mb-8 text-2xl leading-normal',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type ParagraphProps = VariantProps<typeof paragraphCss> &
  HTMLAttributes<HTMLParagraphElement> & {
    //
  };

export function Paragraph({
  children,
  className,
  size,
  ...props
}: ParagraphProps) {
  return (
    <p className={cn(paragraphCss({ size }), className)} {...props}>
      {children}
    </p>
  );
}
