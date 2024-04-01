<h1 style="align-content: center">Three.js + React-Three Fiber + Next.js</h1>

## Description

I wanted to have a starter template to develop more complex experiences while taking advantage of the amazing ecosystem built around [Next.js](https://nextjs.org) and [React-Three Fiber](https://github.com/pmndrs/react-three-fiber). Fortunately, the folks maintaining the excellent [react-three-next](https://github.com/pmndrs/react-three-next) starter gave me everything I needed to create my custom version of it.

In this adaptation, I've added missing TypeScript types in various components and hooks, included `3.x` features such as [Lenis](https://github.com/darkroomengineering/lenis/tree/main) support, extracted dynamic imports to barrel files for a more declarative syntax, and reorganized the codebase around feature folders.

I am also figuring out how to integrate Tweakpane with Jotai to have a more consistent state management + debugging DX. It's all contained within the [debug](./debug) folder for now.

### Features

- [Next.js](https://nextjs.org) with app router support.
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [pmndrs/drei](https://github.com/pmndrs/drei) to create [Three.js](https://threejs.org) experiences using a declarative paradigm well-aligned with React principles.
- [TailwindCSS](https://tailwindcss.com) and [Class Variance Authority](https://cva.style/docs) for a great DX when styling components, primed to leverage [shadcn/ui](https://ui.shadcn.com) if desired.
- Codebase organized around [features](./features) to compose the different pages and an incipient atomic design for [components](./components).
- [TypeScript](https://www.typescriptlang.org) for type safety and great intellisense, together with sensible [ESLint](https://eslint.org) and [Prettier](https://prettier.io) configurations.
- [Jotai](https://jotai.org) as the state management solution with support for [Tweakpane](https://tweakpane.github.io/docs) atoms.
