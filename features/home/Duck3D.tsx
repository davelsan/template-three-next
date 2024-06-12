import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';

import { Duck } from './Models';

export function Duck3D() {
  return (
    <>
      <Duck scale={2} position={[0, -1.6, 0]} />
      <Common color="lightblue" />
      <Camera
        makeDefault
        fov={40}
        position={[0, 0, 6]}
        controls
        enableZoom={false}
      />
    </>
  );
}
