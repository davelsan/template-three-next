import { View as R3FView, ViewProps as R3FViewProps } from '@react-three/drei';

import { cn } from '@shadcn/utils';

type ViewProps = R3FViewProps;

export function View({ className, children, ...props }: ViewProps) {
  return (
    <R3FView className={cn('absolute top-0 size-full', className)} {...props}>
      {children}
    </R3FView>
  );
}
