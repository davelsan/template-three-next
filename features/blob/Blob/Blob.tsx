import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { MeshDistortMaterial, useCursor } from '@react-three/drei';

import { useAtomWithTweak } from '@debug/TweakpaneProvider';
import { blobColorAtom } from '@state/blobColor';
import { InferRef } from '@utils/type-guards/InferRef';

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter();
  const materialRef = useRef<InferRef<typeof MeshDistortMaterial>>(null);
  const [hovered, hover] = useState(false);
  const color = useAtomValue(useAtomWithTweak('color', blobColorAtom));

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
