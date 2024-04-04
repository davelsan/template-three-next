import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { MeshDistortMaterial, useCursor } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

import { atomWithBinding } from '@state/debug';
import { InferRef } from '@utils/type-helpers/InferRef';

export const [blobColorAtom, useColorListener] = atomWithBinding(
  'blobColor',
  '#1fb2f5',
  {
    paths: ['/blob'],
  }
);

interface BlobProps extends MeshProps {
  route?: string;
}

export const Blob = ({ route = '/', ...props }: BlobProps) => {
  const router = useRouter();
  const materialRef = useRef<InferRef<typeof MeshDistortMaterial>>(null);
  const [hovered, hover] = useState(false);

  const color = useAtomValue(blobColorAtom);
  useCursor(hovered);

  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        roughness={0.5}
        color={hovered ? 'hotpink' : color}
      />
    </mesh>
  );
};
