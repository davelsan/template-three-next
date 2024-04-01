import { View as R3FView, ViewProps as R3FViewProps } from '@react-three/drei';

type ViewProps = R3FViewProps;

export function View({ className, children, ...props }: ViewProps) {
  return (
    <R3FView
      className={
        className ??
        'absolute top-0 flex h-screen w-full flex-col items-center justify-center'
      }
      {...props}
    >
      {children}
    </R3FView>
  );
}
