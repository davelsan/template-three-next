import { atom, getDefaultStore, Provider } from 'jotai';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Pane } from 'tweakpane';
import { BindingParams, BindingTarget } from '@tweakpane/core';

import { StateBundle } from './StateBundle';

type UseAtomWithTweakOptions<T> = {
  /**
   * Automatically refresh the tweakpane UI when the atom changes.
   */
  listen?: boolean;
  /**
   * Additional tweakpane binding params.
   */
  params?: BindingParams;
  /**
   * Non-reactive callback function.
   * @param value current atom value
   */
  subscriber?: (value: T) => void;
  /**
   * Fire the subscriber immediately after binding. This option has no effect
   * if `subscriber` is not defined.
   */
  fireImmediately?: boolean;
};

const jotaiStore = getDefaultStore();
const PaneContext = createContext<Pane | undefined>(undefined);

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
    <PaneContext.Provider value={pane}>
      <Provider store={jotaiStore}>{children}</Provider>
    </PaneContext.Provider>
  ) : null;
}

/**
 * Bind an atom to a tweakpane instance. The `options` object should be stable.
 *
 * @example reactive tweak
 * const color = useAtomValue(atomWithTweak);
 *
 * @example non-reactive tweak
 * useAtomWithTweak(
 *   'color',
 *   blobColorAtom,
 *   useMemo(
 *     () => ({
 *       listen: true,
 *       subscriber: (value: string) => {
 *         const material = materialRef.current;
 *         if (!material) return;
 *         material.color.set(new Color(value));
 *       },
 *       fireImmediately: true,
 *     }),
 *   []
 *   )
 * );
 *
 * @param key tweak key
 * @param tweakAtom atom to bind
 * @param options binding options
 */
export function useAtomWithTweak<T>(
  key: string,
  tweakAtom: ReturnType<typeof atom<T>>,
  options?: UseAtomWithTweakOptions<T>
) {
  const pane = useContext(PaneContext);

  if (!pane) {
    throw new Error('useAtomWithTweak must be used within a TweakpaneProvider');
  }

  useEffect(() => {
    // Initialize the atom in the store or reuse if existing
    const initialValue = jotaiStore.get(tweakAtom) ?? tweakAtom.init;
    jotaiStore.set(tweakAtom, initialValue);

    // Dummy object to satisfy tweakpane `addBinding`
    const obj = { [key]: initialValue };

    // Binding with custom reader/writer functions
    const binding = pane.addBinding(obj, key, {
      ...options?.params,
      reader: () => jotaiStore.get(tweakAtom),
      writer: (_: BindingTarget, value: T) => {
        jotaiStore.set(tweakAtom, value);
      },
    });

    // Create non-reactive updates in the tweakpane UI or elsewhere
    const { subscriber, listen, fireImmediately } = options ?? {};
    let unsub: (() => void) | undefined;
    if (subscriber || listen) {
      if (subscriber && fireImmediately) {
        subscriber(jotaiStore.get(tweakAtom));
      }
      unsub = jotaiStore.sub(tweakAtom, () => {
        options?.listen && binding.refresh();
        subscriber && subscriber(jotaiStore.get(tweakAtom));
      });
    }

    // Ensure the pane is visible after adding a binding
    if (pane.hidden) {
      pane.hidden = false;
    }

    return () => {
      pane.remove(binding);
      if (unsub) {
        unsub();
      }
      if (pane.children.length === 0) {
        pane.hidden = true;
      }
    };
  }, [key, pane, options, tweakAtom]); // do NOT add `params` unless providing a stable object or equality function

  return tweakAtom;
}
