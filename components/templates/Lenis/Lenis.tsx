'use client';

import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';
import { LenisContext, ReactLenis } from '@studio-freight/react-lenis';

/**
 * Lenis (smooth scrolling) wrapper.
 * - https://github.com/darkroomengineering/lenis/tree/main/packages/react-lenis
 * - https://github.com/darkroomengineering/lenis
 * Warning: If you use `<OrbitControls/>` inside a `<View/>`, you may need `data-lenis-prevent` to prevent jittering.
 */
export function Lenis({ children, ...props }) {
  const lenisRef = useRef<typeof LenisContext>();

  useEffect(() => {
    return addEffect((t) => lenisRef.current?.raf(t));
  }, []);

  return (
    <ReactLenis
      {...props}
      autoRaf={false}
      ref={(node) => (lenisRef.current = node?.lenis)}
    >
      {children}
    </ReactLenis>
  );
}