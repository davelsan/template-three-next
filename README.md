<h1 style="align-content: center">Three.js + React-Three Fiber + Next.js</h1>

## Description

A starter template to develop more Three.js experiences taking advantage of the amazing ecosystem built around [Next.js](https://nextjs.org) and [React-Three Fiber](https://github.com/pmndrs/react-three-fiber). This repo is derived from the excellent [react-three-next](https://github.com/pmndrs/react-three-next) starter, with some customizations:

### Features

- [Next.js](https://nextjs.org) with app router support.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [pmndrs/drei](https://github.com/pmndrs/drei) to create [Three.js](https://threejs.org) experiences using a declarative syntax.
- [Jotai](https://jotai.org) as the state management solution, including some custom [Tweakpane](https://tweakpane.github.io/docs) atoms for a nicer DX.
- [TailwindCSS](https://tailwindcss.com) and [Class Variance Authority](https://cva.style/docs) primed to leverage [shadcn/ui](https://ui.shadcn.com).
- Codebase organized around [features](./features) and [components](./components).
- [TypeScript](https://www.typescriptlang.org) for type safety and intellisense, with matching [ESLint](https://eslint.org) and [Prettier](https://prettier.io) configurations.


### Other Changes

- Ejected the [ShaderMaterial](./components/webgl/ShaderMaterial/shaderMaterial.ts) from upstream `drei` to better adapt it to a TypeScript codebase.
- Cherry-picked some `3.x` features, such as [Lenis](https://github.com/darkroomengineering/lenis/tree/main) support.
- Extracted dynamic imports to barrel files for a more declarative syntax.
- Added various components, helpers, hooks, and utils.
- Added missing TypeScript types and reorganized the codebase.

## Tweakpane + Jotai

I am figuring out how to integrate Tweakpane with Jotai to have a debugging DX that uses the same API as the central state.

In Next.js, it seems necessary to wait for the first layout render, so tweakpane can append components to the body during initialization. To solve it, I've created a [Tweakpane](./state/debug/Tweakpane.tsx) component that handles the mounting logic. Jotai also recommends using a custom store in Next.js for SSR support.

In addition, there are a couple of [atom helpers](./helpers/jotai) that make it very easy to add and use a reactive tweak. For example, an [atomWithBinding](./helpers/jotai/atomWithBinding.ts) is first declared outside the component, where it returns a regular jotai atom and a subscriber function that can be used anywhere in the app.

### Examples

The tweak atom can be used like any other atom from Jotai. The binding will show up once the consuming component is mounted.

```ts
import { useAtomValue } from 'jotai';

export const [blobColorAtom, useBlobColor] = atomWithBinding(
  'blobColor', // label
  '#1fb2f5',  // value
  {
    // tweakpane binding options
  }
);

export function MyComponent() {

  // blobColor is reactive
  const blobColor = useAtomValue(blobColorAtom);

  return (
    // JSX
  )
}
```

Another option is to use a non-reactive listener. The listener returns a `RefObject` and also accepts a `callback` function that will execute when the binding value changes, without causing a re-render.

While it is not strictly necessary to wrap the function in a `useCallback` hook, doing so will prevent recreating the atom subscription when the component re-renders.

```ts
import { useBlobColor } from './MyComponent';

export function MyOtherComponent() {

  // blobColor is a non-reactive ref
  const blobColorRef = useBlobColor(
    useCallback(({ get, set, value, prevValue }) => {
      // get(anyAtom)
      // set(anyAtom)
      // value <- new value after the change
      // prevVal <- previous atom value
    }, [])
  )

  return (
    // JSX
  )
}
```
