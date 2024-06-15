'use client';

import { Provider } from 'jotai';
import { createStore } from 'jotai/index';
import { PropsWithChildren } from 'react';

/**
 * A custom Jotai store is provided to allow access to the global state outside
 * the React component tree. For example, this is required by the Tweakpane
 * atoms, or in custom geometries and materials extending Three.js classes.
 */
export const jotaiStore = createStore();

/**
 * In Next.js applications, a Jotai `<Provider/>` is required to support SSR.
 * https://jotai.org/docs/guides/nextjs
 * Otherwise, you may encounter a warning about using multiple Jotai instances.
 * https://github.com/pmndrs/jotai/discussions/2044
 */
export function JotaiProvider({ children }: PropsWithChildren) {
  return <Provider store={jotaiStore}>{children}</Provider>;
}
