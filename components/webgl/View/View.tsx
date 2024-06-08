import { View as R3FView, ViewProps as R3FViewProps } from '@react-three/drei';

type ViewProps = R3FViewProps;

export function View({ className, children, ...props }: ViewProps) {
  return (
    <R3FView className={className} {...props}>
      {children}
    </R3FView>
  );
}
