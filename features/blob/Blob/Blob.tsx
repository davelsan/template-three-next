import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { MeshDistortMaterial, useCursor } from '@react-three/drei';

import { useAtomWithTweak } from '@debug/TweakpaneProvider';
import { blobColorAtom } from '@state/blobColor';

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter();
  const [hovered, hover] = useState(false);
  const [color] = useAtomWithTweak('color', blobColorAtom);

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
        roughness={0.5}
        color={hovered ? 'hotpink' : color}
      />
    </mesh>
  );
};
