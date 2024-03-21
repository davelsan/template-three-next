import dynamic from 'next/dynamic';

export const Blob = dynamic(() => import('./Blob').then((mod) => mod.Blob), {
  ssr: false,
});
