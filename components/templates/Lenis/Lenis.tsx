'use client';

import { ComponentProps } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

type LenisProps = ComponentProps<typeof ReactLenis>;

/**
 * Lenis (smooth scrolling) wrapper.
 * - https://github.com/darkroomengineering/lenis/tree/main/packages/react-lenis
 * - https://github.com/darkroomengineering/lenis
 * Warning: If you use `<OrbitControls/>` inside a `<View/>`, you may need `data-lenis-prevent` to prevent jittering.
 */
export function Lenis({ children, ...props }: LenisProps) {
  return <ReactLenis {...props}>{children}</ReactLenis>;
}
