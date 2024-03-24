import { MutableRefObject, useRef } from 'react';

/**
 * Thin compatibility layer for React-Three Fiber components that accept a
 * MutableRefObject without a `null` initial value. Probably due to a mix-up
 * between `createRef` and `useRef`.
 * - https://github.com/pmndrs/drei/issues/1348
 */
export function useImmutableRef<T>(): MutableRefObject<T> {
  return useRef<T>(null as T);
}
