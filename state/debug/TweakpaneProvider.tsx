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
