import dynamic from 'next/dynamic';

export * from './Blob';

export const DynamicBlob = dynamic(
  () => import('./Blob').then((mod) => mod.Blob),
  {
    ssr: false,
  }
);
