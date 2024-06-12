import dynamic from 'next/dynamic';

export * from './Dog';
export * from './Duck';
export * from './Logo';

export const DogDynamic = dynamic(
  () => import('./Dog').then((mod) => mod.Dog),
  {
    ssr: false,
  }
);

export const DuckDynamic = dynamic(
  () => import('./Duck').then((mod) => mod.Duck),
  {
    ssr: false,
  }
);

export const LogoDynamic = dynamic(
  () => import('./Logo').then((mod) => mod.Logo),
  {
    ssr: false,
  }
);
