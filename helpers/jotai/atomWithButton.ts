'use client';

import { atom, Getter, Setter } from 'jotai';
import { ButtonApi, ButtonParams, TpMouseEvent } from '@tweakpane/core';

import { createJotaiSubscriber } from '@helpers/jotai';
import { tweakpaneAtom, tweakpanePathsAtom } from '@state/debug';
import { jotaiStore } from '@state/jotai';

type AtomWithButtonOptions = {
  /**
   * Initial button callback. Unlike the listener, this function will receive
   * the button event.
   */
  callback?: Callback;
  /**
   * Routes in which the tweak should be visible.
   */
  paths?: string[];
};

/**
 * Initial button callback. Receives the button event.
 */
type Callback = (
  event: TpMouseEvent<ButtonApi>,
  get: Getter,
  set: Setter
) => void;

/**
 * Create an atom with tweakpane button params.
 *
 * @example manipulate other atoms
 * const buttonAtom = atomWithButton({
 *   title: 'MyButton',
 *   // other button params...
 * }, {
 *   callback: (get, set) => (event) => {
 *     const value = get(otherAtom1);
 *     set(otherAtom2, value);
 *   }
 * });
 *
 * @param params button params
 * @param options atom options
 */
export function atomWithButton(
  params: ButtonParams,
  options?: AtomWithButtonOptions
) {
  const valueAtom = atom(false);

  valueAtom.onMount = () => {
    const { get, set } = jotaiStore;

    // Event listener to trigger a re-render on button click
    const onClick = (e: TpMouseEvent<ButtonApi>) => {
      options?.callback?.(e, get, set);
      set(valueAtom, (val) => !val);
    };

    // Add the button to the tweakpane instance and set its event listener
    const pane = get(tweakpaneAtom);
    const buttonApi = pane.addButton(params);
    buttonApi.on('click', onClick);

    // Set the `paths` config, if provided
    const paths = options?.paths ?? [];
    set(tweakpanePathsAtom, (prev) => {
      const newValue = [buttonApi, paths] as const;
      return [...prev, newValue];
    });

    return () => {
      set(tweakpanePathsAtom, (prev) => {
        return prev.filter(([b]) => !Object.is(b, buttonApi));
      });
      buttonApi.off('click', onClick);
      pane.remove(buttonApi);
    };
  };

  return [valueAtom, createJotaiSubscriber(valueAtom)] as const;
}
