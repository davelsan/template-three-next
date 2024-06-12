'use client';

import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';

import { Blob } from './Models';

export function Blob3D() {
  return (
    <>
      <Blob />
      <Common />
      <Camera makeDefault fov={40} position={[0, 0, 6]} controls />
    </>
  );
}
