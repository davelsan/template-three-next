import { atom } from 'jotai/index';
import { BindingParams } from '@tweakpane/core';

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
  value: T,
  key: string,
  options?: AtomWithTweakOptions
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
