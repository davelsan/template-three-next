import { Heading2, Paragraph } from '@shadcn/typography';
import { Camera } from '@webgl/Camera';
import { Common } from '@webgl/Common';
import { View } from '@webgl/View';

import { Duck } from './Duck';

export function DuckView() {
  return (
    <div className="flex w-full gap-10">
      <div className="relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40">
        <View className="relative h-full animate-bounce sm:h-48 sm:w-full">
          <Duck scale={2} position={[0, -1.6, 0]} />
          <Common color="lightblue" />
          <Camera
            makeDefault
            fov={40}
            position={[0, 0, 6]}
            controls
            enableZoom={false}
          />
        </View>
      </div>
      <div className="w-full p-6 sm:w-1/2">
        <Heading2>Dom and 3D are synchronized</Heading2>
        <Paragraph className="text-gray-600" size="large">
          3D Divs are rendered through the View component. It uses gl.scissor to
          cut the viewport into segments. You tie a view to a tracking div which
          then controls the position and bounds of the viewport. This allows you
          to have multiple views with a single, performant canvas. These views
          will follow their tracking elements, scroll along, resize, etc.
        </Paragraph>
      </div>
    </div>
  );
}
