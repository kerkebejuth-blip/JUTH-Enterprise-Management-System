import { AlertTriangle, RefreshCw } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

/** Recoverable application fallback for unexpected render failures. */
export function ApplicationFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <section
        className="w-full max-w-lg rounded-xl border border-rose-200 bg-white p-6 shadow-sm"
        role="alert"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-rose-50 p-2 text-rose-700">
            <AlertTriangle size={20} aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-lg font-semibold text-slate-950">
              Workspace unavailable
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              The application could not render this view. No clinical data was
              changed.
            </p>
            <p className="mt-3 break-words text-xs text-slate-500">
              {error instanceof Error ? error.message : "Unexpected application error."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <RefreshCw size={16} aria-hidden="true" />
          Reload workspace
        </button>
      </section>
    </main>
  );
}

/** Stable loading view used while route-level application code is loading. */
export function ApplicationLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <p className="text-sm font-medium text-slate-600" role="status">
        Loading JUTH HOS workspace...
      </p>
    </main>
  );
}
