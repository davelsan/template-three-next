'use client';

import { PropsWithChildren } from 'react';
import { Preload, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { useImmutableRef } from '@hooks/useImmutableRef';

import { Lenis } from '../Lenis';

export function Layout({ children }: PropsWithChildren) {
  const divRef = useImmutableRef<HTMLDivElement>();
  return (
    <div ref={divRef}>
      <Lenis
        root
        options={{
          smoothWheel: true,
          syncTouch: true,
        }}
      >
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
          <View.Port />
          <Preload all />
        </Canvas>
        {children}
      </Lenis>
    </div>
  );
}
