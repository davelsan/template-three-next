import { Heading1, Paragraph } from '@ui/Typography';
import { View } from '@webgl/View';

import { Blob3D } from './Blob3D';

export function BlobView() {
  return (
    <div className="relative max-w-screen-2xl p-10 2xl:mx-auto">
      <div className="flex w-full flex-col flex-wrap lg:absolute lg:w-1/2">
        <Paragraph className="w-full uppercase">
          Next + React Three Fiber
        </Paragraph>
        <Heading1>Next 3D Starter</Heading1>
        <Paragraph size="large">
          The color tweak persists across routes and is reused by the Home page
          logo.
        </Paragraph>
      </div>

      <View className="h-[calc(300px+(800-374)*((100vw-375px)/(1600-375)))] lg:h-screen">
        <Blob3D />
      </View>
    </div>
  );
}
