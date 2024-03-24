'use client';

import { Suspense } from 'react';

import { Common } from '@templates/Common';
import { View } from '@templates/View';

import { Dog } from './Dog';
import { Duck } from './Duck';
import { Logo } from './Logo';

export function HomeView() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col flex-wrap items-center md:flex-row lg:w-4/5">
        {/* jumbo */}
        <div className="flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left">
          <p className="w-full uppercase">Next + React Three Fiber</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Next 3D Starter
          </h1>
          <p className="mb-8 text-2xl leading-normal">
            A minimalist starter for React, React-three-fiber and Threejs.
          </p>
        </div>

        <div className="w-full text-center md:w-3/5">
          <View className="flex h-96 w-full flex-col items-center justify-center">
            <Suspense fallback={null}>
              <Logo route="/blob" scale={0.6} position={[0, 0, 0]} />
              <Common />
            </Suspense>
          </View>
        </div>
      </div>

      <div className="mx-auto flex w-full flex-col flex-wrap items-center p-12 md:flex-row  lg:w-4/5">
        {/* first row */}
        <div className="relative h-48 w-full py-6 sm:w-1/2 md:my-12 md:mb-40">
          <h2 className="mb-3 text-3xl font-bold leading-none text-gray-800">
            Events are propagated
          </h2>
          <p className="mb-8 text-gray-600">
            Drag, scroll, pinch, and rotate the canvas to explore the 3D scene.
          </p>
        </div>
        <div className="relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40">
          <View className="relative h-full  sm:h-48 sm:w-full">
            <Suspense fallback={null}>
              <Dog
                scale={2}
                position={[0, -1.6, 0]}
                rotation={[0.0, -0.3, 0]}
              />
              <Common color="lightpink" controls />
            </Suspense>
          </View>
        </div>
        {/* second row */}
        <div className="relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40">
          <View className="relative h-full animate-bounce sm:h-48 sm:w-full">
            <Suspense fallback={null}>
              <Duck scale={2} position={[0, -1.6, 0]} />
              <Common color="lightblue" controls />
            </Suspense>
          </View>
        </div>
        <div className="w-full p-6 sm:w-1/2">
          <h2 className="mb-3 text-3xl font-bold leading-none text-gray-800">
            Dom and 3D are synchronized
          </h2>
          <p className="mb-8 text-gray-600">
            3D Divs are renderer through the View component. It uses gl.scissor
            to cut the viewport into segments. You tie a view to a tracking div
            which then controls the position and bounds of the viewport. This
            allows you to have multiple views with a single, performant canvas.
            These views will follow their tracking elements, scroll along,
            resize, etc.
          </p>
        </div>
      </div>
    </>
  );
}
