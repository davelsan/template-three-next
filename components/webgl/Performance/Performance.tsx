import { useAtomValue } from 'jotai/index';
import { Perf } from 'r3f-perf';

import { atomWithBinding } from '@state/debug';

const [performanceAtom] = atomWithBinding('Performance', true, {
  index: 0,
});

export function Performance() {
  const perf = useAtomValue(performanceAtom);
  return perf && <Perf position="bottom-right" />;
}
