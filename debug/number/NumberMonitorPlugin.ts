import { NumberMonitorPlugin as DefaultNumberMonitorPlugin } from '@tweakpane/core';

import { customAccept } from '../helpers/customAccept';
import {
  GetReaderType,
  MonitorBindingPluginWithStateParams,
} from '../helpers/customTypes';

const {
  accept, // passes params to the binding
  api,
  binding, // defines reader and writer functions
  controller,
  core,
  id,
  type,
} = DefaultNumberMonitorPlugin;

/**
 * Plugin type alias.
 */
type NumberMonitorPlugin = MonitorBindingPluginWithStateParams<
  typeof DefaultNumberMonitorPlugin
>;
type CustomReader = GetReaderType<NumberMonitorPlugin>;

/**
 * Custom number monitor reader function.
 */
const getNumberReader: CustomReader = (args) => {
  const _reader = args.params.reader;
  if (!_reader) return binding.reader(args);
  return (value) => {
    return _reader(args.target, value as number) as number;
  };
};

export const NumberMonitorPlugin: NumberMonitorPlugin = {
  id: id + 'state',
  type,
  accept: customAccept(accept),
  binding: {
    defaultBufferSize: binding.defaultBufferSize,
    reader: getNumberReader,
  },
  controller,
  core,
  api,
};
