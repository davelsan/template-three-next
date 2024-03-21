import dynamic from 'next/dynamic';

export const Duck = dynamic(() => import('./Duck').then((mod) => mod.Duck), {
  ssr: false,
});
