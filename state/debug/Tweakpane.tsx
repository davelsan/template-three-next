import { atom, useAtom, useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect, useLayoutEffect } from 'react';
import { Pane } from 'tweakpane';
import { BindingApi, ButtonApi } from '@tweakpane/core';

const paneAtom = atom<Pane | undefined>(undefined);

export const tweakpanePathsAtom = atom<
  Array<readonly [BindingApi | ButtonApi, string[]]>
>([]);

export const tweakpaneAtom = atom(
  (get) => {
    const pane = get(paneAtom);
    return pane as Pane;
  },
  (get, set, pane: Pane) => {
    set(paneAtom, pane);
  }
);

/**
 * Provider component to initialize and dispose the tweakpane instance. A
 * custom plugin is registered to support the reader and writer functions
 * that link tweakpane to the jotai atom.
 */
export function Tweakpane({ children }: PropsWithChildren) {
  const [pane, setPane] = useAtom(tweakpaneAtom);
  const bindingPaths = useAtomValue(tweakpanePathsAtom);
  const pathname = usePathname();

  /**
   * To initialize the tweakpane instance, it seems we need to wait for Next.js
   * to render the initial html. This means the Pane has to be created after the
   * first mount.
   */
  useLayoutEffect(() => {
    const pane = new Pane({ title: 'Debug' });
    setPane(pane);
    return () => pane.dispose();
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
    // Hide tweakpane if there are no blades to show.
    pane.hidden = pane.children.length === 0;
  }, [bindingPaths, pane, pathname]);

  return pane ? children : null;
}
