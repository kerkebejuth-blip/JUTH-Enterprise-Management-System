import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";

import { ApplicationFallback, ApplicationLoading } from "./components";
import { router } from "./router/router";

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ApplicationFallback}>
      <Suspense fallback={<ApplicationLoading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}
