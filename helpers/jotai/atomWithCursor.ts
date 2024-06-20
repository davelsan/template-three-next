import { atom } from 'jotai';
import { Vector2 } from 'three';

import { createJotaiSubscriber } from './createJotaiSubscriber';

type AtomWithCursorOpts = {
  initial?: [number, number];
};

export function atomWithCursor(options?: AtomWithCursorOpts) {
  const {
    initial = [9999, 9999], // start off-screen
  } = options ?? {};

  const cursorAtom = atom(new Vector2(...initial));

  const getCursor = (event: PointerEvent) => {
    // Convert to clip space [-1, 1]
    const x = (event.clientX / window.innerWidth) * 2 - 1; // left to right
    const y = -(event.clientY / window.innerHeight) * 2 + 1; // bottom to top
    return new Vector2(x, y);
  };

  const sub = (callback: (event: PointerEvent) => void) => {
    window.addEventListener('pointermove', callback);
    return () => window.removeEventListener('pointermove', callback);
  };

  cursorAtom.onMount = (set) => {
    const callback = (event: PointerEvent) => {
      set(getCursor(event));
    };
    return sub(callback);
  };

  return [cursorAtom, createJotaiSubscriber(cursorAtom)] as const;
}
