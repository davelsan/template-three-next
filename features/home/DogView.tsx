import { Heading2 } from '@shadcn/typography/Heading2';
import { Paragraph } from '@shadcn/typography/Paragraph';
import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';
import { View } from '@webgl/View';

import { Dog } from './Dog';

export function DogView() {
  return (
    <div className="flex w-full items-center gap-10">
      <div className="relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40">
        <Heading2>Events are propagated</Heading2>
        <Paragraph className="text-gray-600" size="large">
          Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.
        </Paragraph>
      </div>
      <div className="relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40">
        <View className="relative h-48 sm:w-full">
          <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} />
          <Common color="lightpink" />
          <Camera
            makeDefault
            fov={40}
            position={[0, 0, 6]}
            controls
            enableZoom={false}
          />
        </View>
      </div>
    </div>
  );
}
