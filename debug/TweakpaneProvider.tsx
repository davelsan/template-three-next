import {
  atom,
  createStore,
  Provider,
  SetStateAction,
  useAtom,
  useSetAtom,
} from 'jotai';
import { usePathname } from 'next/navigation';
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Pane } from 'tweakpane';
import { BindingParams, BindingTarget } from '@tweakpane/core';

import { StateBundle } from './StateBundle';

type TweakpaneProviderProps<T> = {
  container?: MutableRefObject<T>;
};

const tweakpaneStore = createStore();

const PaneContext = createContext<Pane | undefined>(undefined);

export function TweakpaneProvider<T extends HTMLElement>({
  children,
  container,
}: PropsWithChildren<TweakpaneProviderProps<T>>) {
  const pathname = usePathname();
  const [pane, setPane] = useState<Pane>();

  useEffect(() => {
    let _pane = pane;
    if (!_pane) {
      _pane = new Pane({ title: 'Debug' });
      _pane.registerPlugin(StateBundle);
      _pane.hidden = true;
      setPane(_pane);
    }
  }, [container, pane]);

  return pane ? (
    <PaneContext.Provider value={pane}>
      <Provider store={tweakpaneStore}>{children}</Provider>
    </PaneContext.Provider>
  ) : null;
}

type UseAtomWithTweakOptions = {
  listen?: boolean;
  params?: BindingParams;
};

export function useAtomWithTweak<T>(
  key: string,
  tweakAtom: ReturnType<typeof atom<T>>,
  options?: UseAtomWithTweakOptions
) {
  const pane = useContext(PaneContext);

  if (!pane) {
    throw new Error('useAtomWithTweak must be used within a TweakpaneProvider');
  }

  useEffect(() => {
    // Initialize the atom in the store or reuse if existing
    const initialValue = tweakpaneStore.get(tweakAtom) ?? tweakAtom.init;
    tweakpaneStore.set(tweakAtom, initialValue);

    // Dummy object to satisfy tweakpane `addBinding`
    const obj = { [key]: initialValue };

    // Binding with custom reader/writer functions
    const binding = pane.addBinding(obj, key, {
      ...options?.params,
      reader: () => tweakpaneStore.get(tweakAtom),
      writer: (target: BindingTarget, value: T) => {
        tweakpaneStore.set(tweakAtom, value);
      },
    });

    if (pane.hidden) {
      pane.hidden = false;
    }

    return () => {
      pane.remove(binding);
      if (pane.children.length === 0) {
        pane.hidden = true;
      }
    };
  }, [key, pane, tweakAtom]); // do NOT add `params` unless providing a stable object or equality function

  return useAtom(tweakAtom);
}

export function useAtomWithStableTweak<T>(
  key: string,
  tweakAtom: ReturnType<typeof atom<T>>,
  subscriber: (value: T) => void,
  options?: UseAtomWithTweakOptions
): [T, (...args: [SetStateAction<T>]) => void] {
  const pane = useContext(PaneContext);

  if (!pane) {
    throw new Error('useAtomWithTweak must be used within a TweakpaneProvider');
  }

  useEffect(() => {
    // Initialize the atom in the store
    const initialValue = tweakpaneStore.get(tweakAtom) ?? tweakAtom.init;
    tweakpaneStore.set(tweakAtom, initialValue);

    // Dummy object to satisfy tweakpane `addBinding`
    const obj = { [key]: initialValue };

    // Binding with custom reader/writer functions
    const binding = pane.addBinding(obj, key, {
      ...options?.params,
      reader: () => tweakpaneStore.get(tweakAtom),
      writer: (target: BindingTarget, value: T) => {
        tweakpaneStore.set(tweakAtom, value);
      },
    });

    const unsub = tweakpaneStore.sub(tweakAtom, () => {
      subscriber(tweakpaneStore.get(tweakAtom));
    });

    if (pane.hidden) {
      pane.hidden = false;
    }

    return () => {
      pane.remove(binding);
      unsub();
      if (pane.children.length === 0) {
        pane.hidden = true;
      }
    };
  }, [key, pane, subscriber, tweakAtom]); // do NOT add `params` unless providing a stable object or equality function

  const setAtom = useSetAtom(tweakAtom);
  return useMemo(() => [tweakAtom.init, setAtom], [tweakAtom.init, setAtom]);
}
