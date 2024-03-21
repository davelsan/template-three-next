import dynamic from 'next/dynamic';

export const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
});
