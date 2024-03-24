'use client';

import { PropsWithChildren } from 'react';

import { useImmutableRef } from '@hooks/useImmutableRef';

import { Lenis } from '../Lenis';
import { Scene } from '../Scene';

export function Layout({ children }: PropsWithChildren) {
  const ref = useImmutableRef<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Lenis
        root
        options={{
          smoothWheel: true,
          syncTouch: true,
        }}
      >
        {children}
        <Scene
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix="client"
        />
      </Lenis>
    </div>
  );
}
