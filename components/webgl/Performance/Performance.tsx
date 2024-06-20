import { useAtomValue } from 'jotai';
import { Perf } from 'r3f-perf';

import { atomWithBinding } from '@helpers/jotai';

const [performanceAtom] = atomWithBinding('Performance', true, {
  index: 0,
});

export function Performance() {
  const perf = useAtomValue(performanceAtom);
  return perf && <Perf position="bottom-right" />;
}
