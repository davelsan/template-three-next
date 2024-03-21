import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

type CommonProps = {
  color?: string;
  controls?: boolean;
};

export const Common = ({ color, controls }: CommonProps) => (
  <>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={Math.PI} />
    <directionalLight position={[10, 10, 5]} intensity={5} castShadow />
    <pointLight
      decay={0}
      position={[-10, -0, -10]}
      color="blue"
      intensity={3}
    />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    {controls && <OrbitControls />}
  </>
);
