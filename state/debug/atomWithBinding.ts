import { atom, Getter, Setter } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { useEffect } from 'react';
import { BindingParams, FolderApi, FolderParams } from '@tweakpane/core';

import { jotaiStore } from '@state/jotai';

import { tweakpaneAtom, tweakpanePathsAtom } from './Tweakpane';

type AtomWithTweakOptions = BindingParams & {
  /**
   * Automatically refresh the tweakpane UI when the atom changes.
   */
  listen?: boolean;
  /**
   * Routes in which the tweak should be visible.
   * Defaults to all routes.
   */
  paths?: string[];
};

type ListenerArgs<Value> = {
  get: Getter;
  set: Setter;
  value: Value;
  prevValue: Value;
};

const tweakpaneFolderFamily = atomFamily(
  (folderParams: FolderParams) =>
    atom<FolderApi>((get) => {
      const pane = get(tweakpaneAtom);
      return pane.addFolder(folderParams);
    }),
  (a, b) => a.title === b.title
);

/**
 * Atom factory to create atoms attached to a tweakpane binding. If no folder
 * params are provided, the atom will be attached to the tweakpane root blade.
 * @param folderParams tweakpane folder params
 */
export function atomWithBindingFolder(folderParams?: FolderParams) {
  return <T>(label: string, value: T, options?: AtomWithTweakOptions) => {
    const prevAtom = atom(value);
    const currAtom = atom(value);
    const bindingAtom = atom(
      (get) => get(currAtom),
      (get, set, currVal: T) => {
        const prevVal = get(currAtom);
        set(prevAtom, prevVal);
        set(currAtom, currVal);
      }
    );

    bindingAtom.onMount = () => {
      const { get, set, sub } = jotaiStore;
      const { listen, ...params } = options ?? {};

      // Determine where to add the binding in the tweakpane UI.
      const folderAtom = folderParams && tweakpaneFolderFamily(folderParams);
      const pane = folderAtom ? get(folderAtom) : get(tweakpaneAtom);

      // Create the tweakpane binding.
      const key = bindingAtom.toString();
      const currentValue = get(bindingAtom);
      const obj = { [key]: currentValue };
      const binding = pane.addBinding(obj, key, {
        label,
        ...params,
      });

      // Update the atoms with the 'change' event.
      binding.on('change', ({ value }) => {
        set(bindingAtom, value);
      });

      // Support non-reactively updating the tweakpane UI blade.
      let unsubListener: (() => void) | undefined;
      if (listen) {
        unsubListener = sub(bindingAtom, () => {
          listen && binding.refresh();
        });
      }

      // Configure the `paths` in which the tweak is visible. Default is all.
      const paths = options?.paths ?? [];
      set(tweakpanePathsAtom, (prev) => {
        const newValue = [binding, paths] as const;
        return [...prev, newValue];
      });

      // Cleanup the atoms, unsubscribe from listeners, and remove the pane on unmount.
      return () => {
        set(tweakpanePathsAtom, (prev) =>
          prev.filter(([b]) => !Object.is(b, binding))
        );
        unsubListener?.();
        binding.dispose();
        pane.remove(binding);
        if (pane.children.length === 0) {
          const rootPane = get(tweakpaneAtom);
          rootPane.remove(pane);
          folderParams && tweakpaneFolderFamily.remove(folderParams);
        }
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
  };
}

/**
 * Create an atom with tweakpane binding args. Equivalent to calling
 * `atomWithBindingFolder()` with no folder params.
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
export const atomWithBinding = atomWithBindingFolder();
