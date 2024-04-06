'use client';

import { Perf } from 'r3f-perf';
import { PropsWithChildren } from 'react';
import { Preload, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useImmutableRef } from '@hooks/useImmutableRef';
import { Tweakpane } from '@state/debug';
import { JotaiProvider } from '@state/jotai/JotaiProvider';

import { Lenis } from '../Lenis';

export function Layout({ children }: PropsWithChildren) {
  const divRef = useImmutableRef<HTMLDivElement>();
  return (
    <div ref={divRef}>
      <JotaiProvider>
        <Tweakpane>
          <Lenis
            root
            options={{
              smoothWheel: true,
              syncTouch: true,
            }}
          >
            {children}
            <Canvas
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
              }}
              eventSource={divRef}
              eventPrefix="client"
            >
              <Perf position="bottom-right" />
              <View.Port />
              <Preload all />
            </Canvas>
          </Lenis>
        </Tweakpane>
      </JotaiProvider>
    </div>
  );
}
