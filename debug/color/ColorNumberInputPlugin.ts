import {
  colorFromRgbaNumber,
  colorFromRgbNumber,
  colorToRgbaNumber,
  colorToRgbNumber,
  NumberColorInputPlugin as DefaultNumberColorInputPlugin,
} from '@tweakpane/core';

import { customAccept } from '../helpers/customAccept';
import {
  GetReaderType,
  GetWriterType,
  InputBindingPluginWithStateParams,
} from '../helpers/customTypes';

/**
 * Default plugin properties to override.
 */
const {
  accept, // passes params to the binding
  api,
  binding, // defines reader and writer functions
  controller,
  id,
  type,
  core,
} = DefaultNumberColorInputPlugin;

/**
 * Custom plugin type alias.
 */
type ColorNumberInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultNumberColorInputPlugin
>;
type CustomReader = GetReaderType<ColorNumberInputPlugin>;
type CustomWriter = GetWriterType<ColorNumberInputPlugin>;

/**
 * Custom <number>color reader function.
 */
const getColorNumberReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);

  const colorFromNumber = args.params.supportsAlpha
    ? colorFromRgbaNumber
    : colorFromRgbNumber;
  return (value) => {
    const _value = _reader(args.target, value as number);
    return colorFromNumber(_value);
  };
};

/**
 * Custom <number>color writer function.
 */
const getColorNumberWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);

  const colorToNumber = args.params.supportsAlpha
    ? colorToRgbaNumber
    : colorToRgbNumber;
  return (target, value) => {
    _writer(target, colorToNumber(value));
  };
};

export const ColorNumberInputPlugin: ColorNumberInputPlugin = {
  id,
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getColorNumberReader,
    writer: getColorNumberWriter,
  },
  controller,
  api,
  core,
};
