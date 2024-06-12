import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
import type { PerspectiveCamera as ThreePerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import type { OrbitControls as ThreeOrbitControls } from 'three-stdlib/controls/OrbitControls';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

interface CameraProps extends ComponentProps<typeof PerspectiveCamera> {
  controls?: boolean;
  enableZoom?: boolean;
  enableDamping?: boolean;
}

export type CameraApi = {
  camera: ThreePerspectiveCamera | null;
  controls: ThreeOrbitControls | null;
};

export const Camera = forwardRef<CameraApi, CameraProps>(function CameraRef(
  { controls, enableDamping, enableZoom, ...props },
  ref
) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const controlsRef = useRef<ThreeOrbitControls>(null);

  useImperativeHandle(ref, () => ({
    get camera() {
      return cameraRef.current;
    },
    get controls() {
      return controlsRef.current;
    },
  }));

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enabled={Boolean(controls)}
        enableZoom={enableZoom}
        enableDamping={enableDamping}
      />
      <PerspectiveCamera ref={cameraRef} {...props} />
    </>
  );
});
