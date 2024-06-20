import { atom } from 'jotai/index';
import { Pane } from 'tweakpane';
import { BindingApi, ButtonApi } from '@tweakpane/core';

type PaneOptions = {
  enabled?: boolean;
};

export const paneAtom = atom<Pane | undefined>(undefined);

export const tweakpaneOptionsAtom = atom<PaneOptions>({
  enabled: true,
});

export const tweakpanePathsAtom = atom<
  Array<readonly [BindingApi | ButtonApi, string[]]>
>([]);

export const tweakpaneAtom = atom(
  (get) => {
    const pane = get(paneAtom);
    return pane as Pane;
  },
  (get, set, pane: Pane) => {
    set(paneAtom, pane);
  }
);
