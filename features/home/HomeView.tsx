'use client';

import { Dog3D } from '@features/home/Dog3D';
import { Duck3D } from '@features/home/Duck3D';
import { Logo3D } from '@features/home/Logo3D';
import { Heading1, Heading2, Paragraph } from '@shadcn/typography';
import { View } from '@webgl/View';

export function HomeView() {
  return (
    <div className="flex w-full flex-col p-10 lg:gap-20 lg:py-20 xl:px-40 2xl:mx-auto 2xl:max-w-screen-2xl">
      <div className="flex w-full flex-col gap-10 lg:flex-row-reverse">
        <View className="relative flex h-80 w-full">
          <Logo3D />
        </View>

        <div className="flex w-full flex-col">
          <Paragraph className="w-full uppercase">
            Next + React Three Fiber
          </Paragraph>
          <Heading1>Next 3D Starter</Heading1>
          <Paragraph size="large">
            A minimalist starter for React, React-three-fiber and Threejs.
          </Paragraph>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-10 lg:flex-row-reverse">
        <View className="relative my-12 h-48 w-full py-6 lg:my-0">
          <Dog3D />
        </View>

        <div className="relative h-48 w-full py-6 lg:py-0">
          <Heading2>Events are propagated</Heading2>
          <Paragraph className="text-gray-600" size="large">
            Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.
          </Paragraph>
        </div>
      </div>

      <div className="mt-12 flex w-full flex-col gap-10 lg:mt-0 lg:flex-row">
        <View className="relative h-48 w-full animate-bounce lg:mt-12">
          <Duck3D />
        </View>

        <div className="w-full p-6">
          <Heading2>Dom and 3D are synchronized</Heading2>
          <Paragraph className="text-gray-600" size="large">
            3D Divs are rendered through the View component. It uses gl.scissor
            to cut the viewport into segments. You tie a view to a tracking div
            which then controls the position and bounds of the viewport. This
            allows you to have multiple views with a single, performant canvas.
            These views will follow their tracking elements, scroll along,
            resize, etc.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
