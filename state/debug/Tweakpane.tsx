'use client';

import { useAtom, useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useLayoutEffect, useRef } from 'react';
import { Pane } from 'tweakpane';
import { PaneConfig } from 'tweakpane/dist/types/pane/pane-config';

import {
  tweakpaneAtom,
  tweakpaneOptionsAtom,
  tweakpanePathsAtom,
} from './atoms';

/**
 * Provider component to initialize and dispose the tweakpane instance.
 */
export function Tweakpane({
  children,
  ...config
}: PropsWithChildren<PaneConfig>) {
  const [pane, setPane] = useAtom(tweakpaneAtom);
  const bindingPaths = useAtomValue(tweakpanePathsAtom);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { enabled } = useAtomValue(tweakpaneOptionsAtom);

  /**
   * To initialize the tweakpane instance, it seems we need to wait for Next.js
   * to render the initial html. This means the Pane has to be created after the
   * app first mounts.
   */
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const pane = new Pane({
      container: containerRef.current,
      ...config,
    });
    setPane(pane);
    return () => pane.dispose();
    // Purposefully make options non-reactive.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPane]);

  /**
   * Set blade and pane visibility according to each atom configuration.
   */
  useEffect(() => {
    if (!pane) return;
    // Remove blades not associated with the current pathname.
    bindingPaths
      .filter(([_, paths]) => paths.length > 0 && !paths.includes(pathname))
      .forEach(([binding]) => pane.remove(binding));
    // Hide tweakpane if there are no blades to show or not enabled
    pane.hidden = !enabled || pane.children.length === 0;
  }, [bindingPaths, enabled, pane, pathname]);

  return (
    <>
      <div ref={containerRef} className="tp-container"></div>
      {children}
    </>
  );
}
