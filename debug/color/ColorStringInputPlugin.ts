import {
  findColorStringifier,
  readIntColorString,
  StringColorInputPlugin as DefaultStringColorInputPlugin,
  TpError,
} from '@tweakpane/core';

import { customAccept } from '../helpers/customAccept';
import {
  GetReaderType,
  GetWriterType,
  InputBindingPluginWithStateParams,
} from '../helpers/customTypes';

const {
  accept, // passes params to the binding
  api,
  binding, // defines reader and writer functions
  controller,
  core,
  id,
  type,
} = DefaultStringColorInputPlugin;

/**
 * Default plugin type alias.
 */
type ColorStringInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultStringColorInputPlugin
>;
type CustomReader = GetReaderType<ColorStringInputPlugin>;
type CustomWriter = GetWriterType<ColorStringInputPlugin>;

const getColorStringReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    const _value = _reader(args.target, value);
    return readIntColorString(_value);
  };
};

const getColorStringWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);
  return (target, inValue) => {
    const stringify = findColorStringifier(args.params.format);
    if (!stringify) {
      throw TpError.notBindable();
    }
    _writer(target, stringify(inValue));
  };
};

export const ColorStringInputPlugin: ColorStringInputPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getColorStringReader,
    writer: getColorStringWriter,
  },
  controller,
  core,
  api,
};
