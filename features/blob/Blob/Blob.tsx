import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MeshDistortMaterial, useCursor } from '@react-three/drei';

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter();
  const [hovered, hover] = useState(false);
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
        color={hovered ? 'hotpink' : '#1fb2f5'}
      />
    </mesh>
  );
};
