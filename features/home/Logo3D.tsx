import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';

import { Logo } from './Models';

export function Logo3D() {
  return (
    <>
      <Logo route="/blob" scale={0.5} position={[0, 0, 0]} />
      <Common />
      <Camera makeDefault fov={40} position={[0, 0, 6]} />
    </>
  );
}
