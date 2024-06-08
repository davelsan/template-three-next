type CommonProps = {
  color?: string;
};

export const Common = ({ color }: CommonProps) => (
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
  </>
);
