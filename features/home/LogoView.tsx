import { Heading1, Paragraph } from '@shadcn/typography';
import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';
import { View } from '@webgl/View';

import { Logo } from './Logo';

export function LogoView() {
  return (
    <div className="flex w-full gap-10 sm:flex-col-reverse md:flex-row">
      <div className="flex w-full flex-col">
        <Paragraph className="w-full uppercase">
          Next + React Three Fiber
        </Paragraph>
        <Heading1>Next 3D Starter</Heading1>
        <Paragraph size="large">
          A minimalist starter for React, React-three-fiber and Threejs.
        </Paragraph>
      </div>

      <div className="w-full text-center">
        <View className="relative flex h-96 w-full flex-col items-center justify-center">
          <Logo route="/blob" scale={0.5} position={[0, 0, 0]} />
          <Common />
          <Camera makeDefault fov={40} position={[0, 0, 6]} />
        </View>
      </div>
    </div>
  );
}
