import { atom, getDefaultStore, Provider, useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
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

export type UseAtomWithTweakOptions = {
  /**
   * Automatically refresh the tweakpane UI when the atom changes.
   */
  listen?: boolean;
  /**
   * Additional tweakpane binding params.
   */
  params?: BindingParams;
  /**
   * Routes in which the tweak should be visible.
   */
  paths?: string[];
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
 * Create an atom with tweakpane binding args.
 *
 * @example reactive tweak
 * const color = atomWithTweak(1, {
 *   listen: true,
 *   params: { min: 0, max: 10 },
 * });
 *
 * @param value initial value
 * @param key tweakpane key
 * @param options binding options
 */
export function atomWithTweak<T>(
  value: T,
  key: string,
  options?: UseAtomWithTweakOptions
) {
  const optionsAtom = atom(options);
  const keyAtom = atom(key);
  const valueAtom = atom(value);
  return atom(
    () => ({ valueAtom, keyAtom, optionsAtom }),
    (_, set, update: T) => {
      set(valueAtom, update);
    }
  );
}

/**
 * Bind an atom with tweak options to a tweakpane instance.
 *
 * @example reactive tweak
 * const color = useAtomValue(atomWithTweak);
 *
 * @example non-reactive tweak
 * useAtomWithTweak(
 *   blobColorAtom,
 *   useCallback((value: string) => {
 *     const material = materialRef.current;
 *     if (!material) return;
 *     material.color.set(new Color(value));
 *   }, []),
 *   true, // fireImmediately
 * );
 *
 * @param tweakAtom atom with tweak options
 * @param subscriber non-reactive callback function
 * @param fireImmediately fire the subscriber immediately after binding
 */
export function useAtomWithTweak<T>(
  tweakAtom: ReturnType<typeof atomWithTweak<T>>,
  subscriber?: (value: T) => void,
  fireImmediately?: boolean
) {
  const pane = useContext(PaneContext);

  if (!pane) {
    throw new Error('useAtomWithTweak must be used within a TweakpaneProvider');
  }

  const { valueAtom, keyAtom, optionsAtom } = useAtomValue(tweakAtom);
  const key = useAtomValue(keyAtom);
  const _options = useAtomValue(optionsAtom);

  const pathname = usePathname();

  useEffect(() => {
    // Initialize the atom in the store or reuse if existing
    const initialValue = jotaiStore.get(valueAtom) ?? valueAtom.init;
    jotaiStore.set(valueAtom, initialValue);

    // Dummy object to satisfy tweakpane `addBinding`
    const obj = { [key]: initialValue };

    // Binding with custom reader/writer functions
    const binding = pane.addBinding(obj, key, {
      ..._options?.params,
      reader: () => jotaiStore.get(valueAtom),
      writer: (_: BindingTarget, value: T) => {
        jotaiStore.set(tweakAtom, value);
      },
    });
    binding.hidden = true;

    // Create non-reactive updates in the tweakpane UI or elsewhere
    const { listen } = _options ?? {};
    let unsub: (() => void) | undefined;
    if (subscriber || listen) {
      if (subscriber && fireImmediately) {
        subscriber(jotaiStore.get(valueAtom));
      }
      unsub = jotaiStore.sub(tweakAtom, () => {
        listen && binding.refresh();
        subscriber?.(jotaiStore.get(valueAtom));
      });
    }

    // Ensure the pane is visible after adding a binding
    const paths = _options?.paths;
    if (!paths || paths.includes(pathname)) {
      binding.hidden = false;
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
  }, [
    key,
    pane,
    _options,
    fireImmediately,
    pathname,
    subscriber,
    tweakAtom,
    valueAtom,
  ]);

  return valueAtom;
}
