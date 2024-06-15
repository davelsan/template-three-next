import { ReactNode } from 'react';

import { Tweakpane } from '@state/debug';
import { JotaiProvider } from '@state/jotai';
import { Layout } from '@templates/Layout';

import '@styles/tailwind.css';
import '@styles/tweakpane.css';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: 'Next.js + Three.js',
  description:
    'A minimal starter for Next.js, React Three Fiber, and Three.js.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="antialiased">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <JotaiProvider>
          <Tweakpane title="Debug">
            <Layout>{children}</Layout>
          </Tweakpane>
        </JotaiProvider>
      </body>
    </html>
  );
}
