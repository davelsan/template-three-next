'use client';

import { Camera } from '@templates/Camera';
import { Common } from '@templates/Common';
import { View } from '@templates/View';

import { Blob } from './Blob';

export function BlobView() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5">
        <div className="flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left">
          <p className="w-full uppercase">Next + React Three Fiber</p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Next 3D Starter
          </h1>
          <p className="mb-8 text-2xl leading-normal">
            The color tweak persists across routes and is reused by the Home
            page logo.
          </p>
        </div>
      </div>

      <View className="absolute top-0 flex h-screen w-full flex-col items-center justify-center">
        <Blob />
        <Common />
        <Camera makeDefault fov={40} position={[0, 0, 6]} controls />
      </View>
    </>
  );
}
