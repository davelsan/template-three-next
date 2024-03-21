'use client';

import * as THREE from 'three';
import { Preload, View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

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
