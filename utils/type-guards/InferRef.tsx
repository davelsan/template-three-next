import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Infer the ref type from a ForwardRef component.
 * Source: https://stackoverflow.com/a/76735017/3881613
 */
export type InferRef<T> =
  T extends ForwardRefExoticComponent<infer Ref>
    ? Ref extends RefAttributes<infer RefElement>
      ? RefElement
      : never
    : never;
