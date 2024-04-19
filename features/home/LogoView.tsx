import { Logo } from '@features/home/Logo';
import { Heading1 } from '@shadcn/typography/Heading1';
import { TextLarge } from '@shadcn/typography/TextLarge';
import { Camera } from '@templates/Camera';
import { Common } from '@templates/Common';
import { View } from '@templates/View';

export function LogoView() {
  return (
    <div className="flex w-full gap-10 sm:flex-col-reverse md:flex-row">
      <div className="flex w-full flex-col">
        <p className="w-full uppercase">Next + React Three Fiber</p>
        <Heading1>Next 3D Starter</Heading1>
        <TextLarge>
          A minimalist starter for React, React-three-fiber and Threejs.
        </TextLarge>
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
