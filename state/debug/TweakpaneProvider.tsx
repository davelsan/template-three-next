import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { BladeApi, Pane } from 'tweakpane';
import { BindingApi, BindingParams, ButtonParams } from '@tweakpane/core';

import { StateBundle } from '@debug/StateBundle';

export const PaneContext = createContext<Pane | undefined>(undefined);

export class Tweakpane {
  private static _pane: Pane;
  private static _bindings: Record<string, BindingApi> = {};

  public static get pane() {
    if (!this._pane) {
      throw new Error(
        'Tweak atoms require the TweakpaneProvider to be initialized'
      );
    }
    return this._pane;
  }

  public static set pane(pane: Pane) {
    this._pane = pane;
  }

  public static addBinding<T>(
    key: string,
    value: T,
    params?: BindingParams,
    paths?: string[]
  ) {
    const obj = { [key]: value };
    return this._pane.addBinding(obj, key, params);
  }

  public static addButton(params: ButtonParams) {
    return this._pane.addButton(params);
  }

  public static remove(binding: BladeApi) {
    this._pane.remove(binding);
  }
}

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
    Tweakpane.pane = new Pane({ title: 'Debug' });
    Tweakpane.pane.registerPlugin(StateBundle);
    // Tweakpane.pane.hidden = true;
    setPane(Tweakpane.pane);
    return () => {
      Tweakpane.pane.dispose();
    };
  }, []);

  return pane ? (
    <PaneContext.Provider value={pane}>{children}</PaneContext.Provider>
  ) : null;
}
