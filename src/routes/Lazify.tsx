import { Suspense, lazy, ComponentType } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

const Lazify = (
  Page: () => Promise<{ default: ComponentType }>,
  Fallback?: React.FC
) => {
  const LazyPage = lazy(Page);

  return function Lazied<T extends object>(props: T) {
    return (
      <ErrorBoundary>
        <Suspense fallback={Fallback ? <Fallback /> : null}>
          <LazyPage {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
};

export default Lazify;
