import { atom, Getter, Setter, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { ButtonApi, ButtonParams, TpMouseEvent } from '@tweakpane/core';

import { Tweakpane } from '@state/debug/TweakpaneProvider';
import { jotaiStore } from '@state/jotai/JotaiProvider';

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
 * Non-reactive button callback listener. It will not trigger a re-render
 * unless the `set` function is used and the atom value is being listened.
 */
type CallbackListener = (get: Getter, set: Setter) => void;

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
    const onClick = (e: TpMouseEvent<ButtonApi>) => {
      const { get, set } = jotaiStore;
      options?.callback?.(e, get, set);
      set(valueAtom, (val) => !val);
    };
    const buttonApi = Tweakpane.addButton(params);
    buttonApi.on('click', onClick);
    return () => {
      buttonApi.off('click', onClick);
      Tweakpane.remove(buttonApi);
    };
  };

  /**
   * Perform a side effect using a stable callback function. It will show
   * the tweakpane button, but by it will not cause a re-render by itself
   * unless the `set` function is used.
   * @param callback on-click callback function
   */
  function useListener(callback: CallbackListener) {
    useEffect(() => {
      const { get, set, sub } = jotaiStore;
      return sub(valueAtom, () => {
        callback(get, set);
      });
    }, [callback]);
  }

  return [valueAtom, useListener] as const;
}
