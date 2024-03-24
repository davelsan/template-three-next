'use client';

import { AgXToneMapping } from 'three';
import { Preload, View } from '@react-three/drei';
import { Canvas, CanvasProps } from '@react-three/fiber';

type SceneProps = Omit<CanvasProps, 'children'>;

export default function Scene(props: SceneProps) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      onCreated={(state) => (state.gl.toneMapping = AgXToneMapping)}
    >
      <View.Port />
      <Preload all />
    </Canvas>
  );
}
