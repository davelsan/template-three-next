import { PropsWithChildren } from 'react';

import { Paragraph } from '@shadcn/typography/Paragraph';

type TypographyLargeProps = {};
export function TextLarge({
  children,
}: PropsWithChildren<TypographyLargeProps>) {
  return (
    <Paragraph className="mb-8 text-2xl leading-normal">{children}</Paragraph>
  );
}
