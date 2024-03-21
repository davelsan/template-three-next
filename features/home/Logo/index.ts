import dynamic from 'next/dynamic';

export const Logo = dynamic(() => import('./Logo').then((mod) => mod.Logo), {
  ssr: false,
});
