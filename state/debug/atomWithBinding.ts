import { atom } from 'jotai';
import { Getter, SetStateAction, Setter } from 'jotai/index';
import { useEffect } from 'react';
import { BindingParams, BindingTarget } from '@tweakpane/core';

import { Tweakpane } from '@state/debug/TweakpaneProvider';
import { jotaiStore } from '@state/jotai/JotaiProvider';

type AtomWithTweakOptions = {
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

type ListenerArgs<Value> = {
  get: Getter;
  set: Setter;
  value: Value;
  prevValue: Value;
};

/**
 * Create an atom with tweakpane binding args.
 *
 * @example reactive tweak
 * const color = atomWithBinding(1, {
 *   listen: true,
 *   params: { min: 0, max: 10 },
 * });
 *
 * @param value initial value
 * @param key tweakpane key
 * @param options binding options
 */
export function atomWithBinding<T>(
  key: string,
  value: T,
  options?: AtomWithTweakOptions
) {
  const prevAtom = atom(value);
  const currAtom = atom(value);

  const bindingAtom = atom(
    (get) => get(currAtom),
    (get, set, arg: SetStateAction<T>) => {
      const prevVal = get(currAtom);
      set(prevAtom, prevVal);
      set(currAtom, arg);
    }
  );

  bindingAtom.onMount = () => {
    const binding = Tweakpane.addBinding(key, value, {
      ...options?.params,
      reader: () => jotaiStore.get(bindingAtom),
      writer: (_: BindingTarget, value: T) => {
        jotaiStore.set(bindingAtom, value);
      },
    });

    // Create non-reactive updates in the tweakpane UI or elsewhere
    const { listen } = options ?? {};
    let unsubListener: (() => void) | undefined;
    if (listen) {
      unsubListener = jotaiStore.sub(bindingAtom, () => {
        listen && binding.refresh();
      });
    }

    return () => {
      unsubListener?.();
      binding.dispose();
      Tweakpane.remove(binding);
    };
  };

  /**
   * Perform a side effect using a stable callback function. This hook is meant
   * to be used instead of `useAtom` or `useAtomValue`. Returns the current atom
   * value at render time, but updating the tweak will not cause a re-render.
   *
   * @example update a material color without re-rendering
   * const color = useColorListener(
   *   useCallback(({ value, prevValue }) => {
   *     material.uniforms.uColor.value.set(value);
   *   }, [])
   * );
   *
   * @param callback stable callback function to execute on atom changes
   */
  function useListener(callback: (args: ListenerArgs<T>) => void) {
    // Retrieve the latest atom value
    const value = jotaiStore.get(currAtom);

    useEffect(() => {
      const { get, set, sub } = jotaiStore;

      // Subscribing to the atom will trigger the `onMount` effect.
      return sub(bindingAtom, () => {
        callback({
          get,
          set,
          value: get(currAtom),
          prevValue: get(prevAtom),
        });
      });
    }, [callback]);

    return value;
  }

  return [bindingAtom, useListener] as const;
}
