'use client';

import { useCallback } from 'react';

import { Heading1, Heading2, Paragraph } from '@shadcn/typography';
import { View } from '@webgl/View';

import { blobColorAtom, useBlobColor } from '../blob/Models';
import { Dog3D } from './Dog3D';
import { Duck3D } from './Duck3D';
import { Logo3D } from './Logo3D';

export function HomeView() {
  const color = useBlobColor(
    useCallback(({ set, value }) => {
      set(blobColorAtom, value);
    }, [])
  );

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
            A minimalist starter for React, React-three-fiber and Three.js.
          </Paragraph>
          <Paragraph>
            The blob color tweak will not cause this page to re-render, and so
            this inline value will not change. Click on the blob to navigate to
            the next page and try a reactive tweak, or navigate back to see the
            updated value. The color is:{' '}
            <span className="font-mono">{color.current}</span>
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
