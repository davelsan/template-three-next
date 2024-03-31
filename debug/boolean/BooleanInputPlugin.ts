import { BooleanInputPlugin as DefaultBooleanInputPlugin } from '@tweakpane/core';

import { customAccept } from '../helpers/customAccept';
import {
  GetReaderType,
  GetWriterType,
  InputBindingPluginWithStateParams,
} from '../helpers/customTypes';

/**
 * Override the binding and accept functions.
 */
const {
  accept, // passes params to the binding
  api,
  binding, // defines reader and writer functions
  controller,
  core,
  id,
  type,
} = DefaultBooleanInputPlugin;

/**
 * Plugin type alias.
 */
type BooleanInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultBooleanInputPlugin
>;
type CustomReader = GetReaderType<BooleanInputPlugin>;
type CustomWriter = GetWriterType<BooleanInputPlugin>;

/**
 * Custom boolean input reader function.
 */
const getBooleanReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    return _reader(args.target, Boolean(value));
  };
};

/**
 * Custom boolean input writer function.
 */
const getBooleanWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);
  return (target, value) => {
    _writer?.(target, value);
  };
};

export const BooleanInputPlugin: BooleanInputPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getBooleanReader,
    writer: getBooleanWriter,
  },
  controller,
  core,
  api,
};
