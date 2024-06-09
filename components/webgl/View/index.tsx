import dynamic, { DynamicOptionsLoadingProps } from 'next/dynamic';
import { createContext, useContext } from 'react';
import { ViewProps } from '@react-three/drei';

const DynamicContext = createContext<ViewProps | undefined>(undefined);

const DynamicView = dynamic(() => import('./View').then((mod) => mod.View), {
  ssr: false,
  loading: (loadingProps) => <ViewLoading {...loadingProps} />,
});

function ViewLoading(_loadingProps: DynamicOptionsLoadingProps) {
  const { className } = useContext(DynamicContext) ?? {};

  return (
    <div className={className}>
      <svg
        className="-ml-1 mr-3 size-5 animate-spin text-black"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function View(props: ViewProps) {
  return (
    <DynamicContext.Provider value={props}>
      <DynamicView {...props} />
    </DynamicContext.Provider>
  );
}

// /**
//  * Alternatively, without Context.
//  */
// const DynamicView = lazy(async () => ({
//   default: (await import('./View')).View,
// }));
//
// export function View(props: ViewProps) {
//   return (
//     <Suspense fallback={
//       <div className={props.className}>
//         <svg
//           className="-ml-1 mr-3 size-5 animate-spin text-black"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           />
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//           />
//         </svg>
//       </div>
//     }>
//       <DynamicView {...props} />
//     </Suspense>
//   );
// }
