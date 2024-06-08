import dynamic from 'next/dynamic';

export const Common = dynamic(
  () => import('./Common').then((mod) => mod.Common),
  { ssr: false }
);
