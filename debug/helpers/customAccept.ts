import { parseRecord } from '@tweakpane/core';

/**
 * Accept function return type (not exported from `@tweakpane/core`).
 */
interface Acceptance<T, P> {
  initialValue: T;
  params: P;
}

/**
 * Accept function type (not exported from `@tweakpane/core`).
 */
type AcceptFunction<Ex, P> = {
  /**
   * @param exValue The value input by users.
   * @param params The additional parameters specified by users.
   * @return A typed value if the plugin accepts the input, or null if the plugin sees them off and pass them to the next plugin.
   */
  (exValue: unknown, params: Record<string, unknown>): Acceptance<Ex, P> | null;
};

/**
 * Custom accept function that extends the default by passing the custom reader
 * and writer params to the rest of the plugin chain.
 * @param accept default accept function
 */
export const customAccept = <Ex, P>(
  accept: AcceptFunction<Ex, P>
): AcceptFunction<Ex, P> => {
  return (value, params) => {
    const result = accept(value, params);
    if (result) {
      result.params = {
        ...result.params,
        ...parseRecord(params, (p) => ({
          reader: p.optional.function,
          writer: p.optional.function,
        })),
      };
    }
    return result as ReturnType<typeof accept>;
  };
};
