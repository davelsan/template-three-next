import { useAtomValue } from 'jotai/index';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { atomWithButton } from '@state/debug/atomWithButton';
import { PaneContext } from '@state/debug/TweakpaneProvider';
import { jotaiStore } from '@state/jotai/JotaiProvider';

/**
 * Bind a button tweak atom to the tweakpane instance. Unlike the other
 * hooks, this does not return an atom. It only adds the button to the
 * tweakpane instance.
 *
 * @example add the button to the tweakpane
 * useAtomWithButton(buttonAtom);
 *
 * @param tweakAtom atom with button params
 */
export function useAtomWithButton(
  tweakAtom: ReturnType<typeof atomWithButton>
) {
  const pane = useContext(PaneContext);

  if (!pane) {
    throw new Error(
      'useAtomWithBinding must be used within a TweakpaneProvider'
    );
  }

  const pathname = usePathname();

  const { optionsAtom, paramsAtom } = useAtomValue(tweakAtom);
  const params = useAtomValue(paramsAtom);
  const options = useAtomValue(optionsAtom);

  useEffect(() => {
    // Add the button to the pane
    const { callback, ...buttonParams } = params;
    const buttonApi = pane.addButton(buttonParams);
    const onClick = callback(jotaiStore.get, jotaiStore.set);
    buttonApi.on('click', onClick);

    // Ensure the pane is visible after adding a binding
    const paths = options?.paths;
    if (!paths || paths.includes(pathname)) {
      buttonApi.hidden = false;
      pane.hidden = false;
    }

    return () => {
      buttonApi.off('click', onClick);
      pane.remove(buttonApi);
      if (pane.children.length === 0) {
        pane.hidden = true;
      }
    };
  }, [params, options, pane, pathname]);

  return null;
}
