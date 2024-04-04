import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Pane } from 'tweakpane';

import { StateBundle } from '@debug/StateBundle';

export const PaneContext = createContext<Pane | undefined>(undefined);

/**
 * Provider component to initialize and dispose the tweakpane instance. A
 * custom plugin is registered to support the reader and writer functions
 * that link tweakpane to the jotai atom.
 */
export function TweakpaneProvider({ children }: PropsWithChildren) {
  const [pane, setPane] = useState<Pane>();

  /**
   * Unfortunately, to initialize the tweakpane instance we need to wait for
   * Next.js to render the initial html. This means the Pane has to be created
   * after the first mount.
   *
   * Ideally, we'd like to have access to the Pane instance outside of React.
   * This would enable the atomWith* functions to create the bindings, and so
   * the useAtomWith* hooks would no longer be necessary. However, this "better"
   * solution would also have some drawbacks:
   * - The pane and bindings could not be hidden depending on the pathname.
   * - No subscriber/listener cleanup on component unmount.
   */
  useEffect(() => {
    const _pane = new Pane({ title: 'Debug' });
    _pane.registerPlugin(StateBundle);
    _pane.hidden = true;
    setPane(_pane);
    return () => {
      _pane.dispose();
    };
  }, []);

  return pane ? (
    <PaneContext.Provider value={pane}>{children}</PaneContext.Provider>
  ) : null;
}
