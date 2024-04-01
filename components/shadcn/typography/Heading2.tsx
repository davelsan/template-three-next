import { PropsWithChildren } from 'react';

type TypographyH2Props = {};

export function Heading2({ children }: PropsWithChildren<TypographyH2Props>) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-normal first:mt-0">
      {children}
    </h2>
  );
}
