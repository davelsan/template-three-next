import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';

import { Dog } from './Models';

export function Dog3D() {
  return (
    <>
      <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
      <Common color="lightpink" />
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
