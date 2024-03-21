'use client';

import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Preload,
  View,
} from '@react-three/drei';
import * as THREE from 'three';

type CommonProps = {
  color?: string;
  controls?: boolean;
};

export const Common = ({ color, controls }: CommonProps) => (
  <>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={Math.PI} />
    <directionalLight position={[10, 10, 5]} intensity={5} castShadow />
    <pointLight
      decay={0}
      position={[-10, -0, -10]}
      color="blue"
      intensity={3}
    />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    {controls && <OrbitControls />}
  </>
);

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
