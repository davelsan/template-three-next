import { createStore, Provider } from 'jotai/index';
import { PropsWithChildren } from 'react';

/**
 * Application-wide jotai store. A new one is created instead of reusing the
 * default store to prevent a bug whereby two different jotai instances were
 * being created. It might be related to the TweakpaneProvider and its related
 * atoms. Need to investigate further.
 */
export const jotaiStore = createStore();

/**
 * Provider component to initialize the jotai store.
 */
export function JotaiProvider({ children }: PropsWithChildren) {
  return <Provider store={jotaiStore}>{children}</Provider>;
}
