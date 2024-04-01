import { PropsWithChildren } from 'react';

type TypographyH4Props = {};
export function Heading4({ children }: PropsWithChildren<TypographyH4Props>) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}
