import dynamic from 'next/dynamic';

export const Dog = dynamic(() => import('./Dog').then((mod) => mod.Dog), {
  ssr: false,
});
