import { ObjectColorInputPlugin as DefaultObjectColorInputPlugin } from '@tweakpane/core';
import { colorFromObject } from '@tweakpane/core/dist/input-binding/color/converter/color-object';
import { mapColorType } from '@tweakpane/core/dist/input-binding/color/model/colors';

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
  core,
  id,
  type,
} = DefaultObjectColorInputPlugin;

/**
 * Default plugin type alias.
 */
type ColorObjectInputPlugin = InputBindingPluginWithStateParams<
  typeof DefaultObjectColorInputPlugin
>;
type CustomReader = GetReaderType<ColorObjectInputPlugin>;
type CustomWriter = GetWriterType<ColorObjectInputPlugin>;

/**
 * Custom <object>color reader function.
 */
const getColorObjectReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    const _value = _reader(args.target, value);
    const c = colorFromObject(_value, args.params.colorType);
    return mapColorType(c, 'int');
  };
};

/**
 * Custom <object>color writer function.
 */
const getColorObjectWriter: CustomWriter = (args) => {
  const _writer = args.params.writer;
  if (!_writer) return binding.writer(args);
  return (target, inValue) => {
    const cc = mapColorType(inValue, args.params.colorType);
    const obj = cc.toRgbaObject();
    _writer(target, obj);
  };
};

export const ColorObjectInputPlugin: ColorObjectInputPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    constraint: binding.constraint,
    equals: binding.equals,
    reader: getColorObjectReader,
    writer: getColorObjectWriter,
  },
  controller,
  core,
  api,
};
