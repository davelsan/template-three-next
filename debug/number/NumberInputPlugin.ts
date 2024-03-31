import { NumberInputPlugin as DefaultNumberInputPlugin } from '@tweakpane/core';

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
} = DefaultNumberInputPlugin;

/**
 * Plugin type alias.
 */
type NumberInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultNumberInputPlugin
>;
type CustomReader = GetReaderType<NumberInputPlugin>;
type CustomWriter = GetWriterType<NumberInputPlugin>;

/**
 * Custom number input reader function.
 */
const getNumberReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    return _reader(args.target, Number(value));
  };
};

/**
 * Custom number input writer function.
 */
const getNumberWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);
  return (target, value) => {
    _writer?.(target, value);
  };
};

export const NumberInputPlugin: NumberInputPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getNumberReader,
    writer: getNumberWriter,
  },
  controller,
  core,
  api,
};
