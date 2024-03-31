import { StringInputPlugin as DefaultStringInputPlugin } from '@tweakpane/core';

import { customAccept } from '../helpers/customAccept';
import {
  GetReaderType,
  GetWriterType,
  InputBindingPluginWithStateParams,
} from '../helpers/customTypes';

const {
  accept,
  api, // passes params to the binding
  binding, // defines reader and writer functions
  controller,
  core,
  id,
  type,
} = DefaultStringInputPlugin;

/**
 * Plugin type alias.
 */
type StringInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultStringInputPlugin
>;
type CustomReader = GetReaderType<StringInputPlugin>;
type CustomWriter = GetWriterType<StringInputPlugin>;

/**
 * Custom string input reader function.
 */
const getStringReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    return _reader(args.target, value);
  };
};

/**
 * Custom string input writer function.
 */
const getStringWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);
  return (target, value) => {
    _writer(target, value);
  };
};

export const StringInputPlugin: StringInputPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getStringReader,
    writer: getStringWriter,
  },
  controller,
  core,
  api,
};
