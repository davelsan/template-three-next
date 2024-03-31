import {
  Bindable,
  BindingApi,
  BindingParams,
  BindingTarget,
  InputBindingPlugin,
  MonitorBindingPlugin,
} from '@tweakpane/core';

/**
 * Flexible parameters to allow the `readonly` states of both monitor (true)
 * and input (false) bindings.
 */
type BaseParams = BindingParams &
  Record<string, unknown> & {
    readonly?: boolean;
  };

/**
 * Default binding arguments for the reader and writer functions.
 */
interface BindingArguments<T, P extends BaseParams> {
  initialValue: T;
  params: P;
  target: BindingTarget;
}

/**
 * Input binding plugin with custom reader and writer state parameters.
 */
export type InputBindingPluginWithStateParams<T> =
  T extends InputBindingPlugin<infer In, infer Ex, infer Params>
    ? InputBindingPlugin<In, Ex, WithStateParams<Params, Ex>>
    : never;

/**
 * Monitor binding plugin with a custom reader state parameter.
 */
export type MonitorBindingPluginWithStateParams<T> =
  T extends MonitorBindingPlugin<infer In, infer Params>
    ? MonitorBindingPlugin<In, WithStateParams<Params, In>>
    : never;

/**
 * Get the reader type from the binding plugin.
 */
export type GetReaderType<T> =
  T extends InputBindingPlugin<infer In, infer Ex, infer Params>
    ? T['binding']['reader']
    : T extends MonitorBindingPlugin<infer In, infer Params>
      ? T['binding']['reader']
      : never;

/**
 * Get the writer type from the input binding plugin.
 */
export type GetWriterType<T> =
  T extends InputBindingPlugin<infer In, infer Ex, infer Params>
    ? T['binding']['writer']
    : never;

/**
 * Binding input arguments for the default reader and writer params.
 */
export type DefaultInputBindingArgs<T> =
  T extends InputBindingPlugin<infer In, infer Ex, infer Params>
    ? BindingArguments<Ex, Params>
    : never;

/**
 * Binding monitor arguments for the default reader param.
 */
export type DefaultMonitorBindingArgs<T> =
  T extends MonitorBindingPlugin<infer In, infer Params>
    ? BindingArguments<In, Params>
    : never;

/**
 * Binding input arguments with custom writer and reader params.
 */
export type CustomInputBindingArgs<T> =
  T extends InputBindingPlugin<infer In, infer Ex, infer Params>
    ? BindingArguments<Ex, WithStateParams<Params, Ex>>
    : never;

/**
 * Binding monitor arguments with custom reader param.
 */
export type CustomMonitorBindingArgs<T> =
  T extends MonitorBindingPlugin<infer In, infer Params>
    ? BindingArguments<In, WithStateParams<Params, In>>
    : never;

/**
 * Extend binding type args with params with custom reader and writer params.
 */
type WithStateParams<P, V> = P & {
  reader?: (target: BindingTarget, value: unknown) => V;
  writer?: (target: BindingTarget, value: V) => void;
};

/**
 * Module augmentation for the `FolderApi` to add the custom binding functions.
 */
declare module '@tweakpane/core' {
  interface FolderApi {
    addBinding<T extends Bindable, K extends keyof T>(
      target: T,
      key: K,
      options?: WithStateParams<BindingParams, K>
    ): BindingApi;
  }
}
