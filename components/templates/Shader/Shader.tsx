import {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
} from 'react';
import { Color, GLSL3 } from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';

import fragment from './glsl/shader.frag';
import vertex from './glsl/shader.vert';

type ShaderProps = {
  time: number;
  color: Color;
};

type ShaderImpl = typeof ShaderImpl & ShaderProps;

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new Color(0.05, 0.0, 0.025),
  },
  vertex,
  fragment
);

extend({ ShaderImpl });

const Shader = forwardRef<ShaderImpl, PropsWithChildren<ShaderProps>>(
  function ShaderRef({ children, ...props }, ref) {
    const localRef = useRef<ShaderImpl>();

    useImperativeHandle(ref, () => localRef.current);

    useFrame((_, delta) => {
      if (!localRef.current) return;
      localRef.current.time += delta;
    });
    return (
      // @ts-expect-error unknown element
      <shaderImpl ref={localRef} glsl={GLSL3} {...props} attach="material" />
    );
  }
);

export default Shader;
