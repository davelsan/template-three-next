import { PropsWithChildren } from 'react';

type TypographyH1Props = {};

export function Heading1({ children }: PropsWithChildren<TypographyH1Props>) {
  return (
    <h1 className="scroll-m-20 text-4xl font-bold lg:text-5xl">{children}</h1>
  );
}
