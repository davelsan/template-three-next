'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { Lenis } from '@/components/dom/Lenis';
const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
});

const Layout = ({ children }) => {
  const ref = useRef();

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
};

export { Layout };
