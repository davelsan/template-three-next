import { atom, Getter, Setter } from 'jotai';
import { ButtonApi, ButtonParams, TpMouseEvent } from '@tweakpane/core';

type AtomWithButtonOptions = {
  /**
   * Routes in which the tweak should be visible.
   */
  paths?: string[];
};

/**
 * Create an atom with tweakpane button params.
 *
 * @example manipulate other atoms
 * const buttonAtom = atomWithButton({
 *   title: 'MyButton',
 *   callback: (get, set) => (event) => {
 *     const value = get(otherAtom1);
 *     set(otherAtom2, value);
 *   }
 * );
 *
 * @param params button params
 * @param options atom options
 */
export function atomWithButton(
  params: ButtonParams & {
    callback: (
      get: Getter,
      set: Setter
    ) => (event: TpMouseEvent<ButtonApi>) => void;
  },
  options?: AtomWithButtonOptions
) {
  const paramsAtom = atom(params);
  const optionsAtom = atom(options);
  return atom({
    optionsAtom,
    paramsAtom,
  });
}
