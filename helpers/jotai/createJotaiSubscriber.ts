import { Atom, Getter, Setter } from 'jotai';
import { useEffect, useRef } from 'react';

import { jotaiStore } from '@state/jotai';

type SubscriberArgs<Value, Prev> = {
  /**
   * Getter function to retrieve _any_ atom value in the store.
   */
  get: Getter;
  /**
   * Setter function to update _any_ atom value in the store.
   */
  set: Setter;
  /**
   * Current atom value.
   */
  value: Value;
  /**
   * Previous atom value.
   */
  prevValue: Prev;
};

/**
 * Factory function to create a hook that enables non-reactive subscription to
 * a jotai atom.
 * @param currAtom jotai atom
 * @param prevAtom optional jotai atom holding the previous value
 */
export function createJotaiSubscriber<T, P extends T | undefined = undefined>(
  currAtom: Atom<T>,
  prevAtom?: Atom<P>
) {
  /**
   * Non-reactive subscriber hook. The callback function should be stable when
   * declared within a component, to avoid creating the effect on every render.
   * @param callback function to execute when the atom value changes.
   * @returns non-reactive reference to the current atom value.
   */
  return function useSubscriber(
    callback: (args: SubscriberArgs<T, P>) => void
  ) {
    const value = useRef(jotaiStore.get(currAtom));

    useEffect(() => {
      const { get, set, sub } = jotaiStore;
      return sub(currAtom, () => {
        value.current = get(currAtom);
        callback({
          get,
          set,
          value: get(currAtom),
          prevValue: prevAtom ? get(prevAtom) : (undefined as P),
        });
      });
    }, [callback]);

    return value;
  };
}
