'use client';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { EllipseCurve, Group } from 'three';
import { Line, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { blobColorAtom } from '@features/blob/Blob/Blob';

export const Logo = ({ route = '/blob', ...props }) => {
  const groupRef = useRef<Group>(null);
  const router = useRouter();
  const [hovered, hover] = useState(false);

  const points = useMemo(
    () =>
      new EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  );

  const blobColor = useAtomValue(blobColorAtom);

  useCursor(hovered);
  useFrame((state, delta) => {
    const mesh = groupRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    mesh.rotation.y = Math.sin(t) * (Math.PI / 8);
    mesh.rotation.x = Math.cos(t) * (Math.PI / 8);
    mesh.rotation.z -= delta / 4;
  });

  return (
    <group ref={groupRef} {...props}>
      <Line worldUnits points={points} color="#1fb2f5" lineWidth={0.15} />
      <Line
        worldUnits
        points={points}
        color="#1fb2f5"
        lineWidth={0.15}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="#1fb2f5"
        lineWidth={0.15}
        rotation={[0, 0, -1]}
      />
      <mesh
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial
          roughness={0.5}
          color={hovered ? 'hotpink' : blobColor}
        />
      </mesh>
    </group>
  );
};
