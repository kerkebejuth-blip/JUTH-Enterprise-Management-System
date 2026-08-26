import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-4xl items-center justify-center">
      <div className="w-full rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="rounded-lg bg-slate-100 p-3 text-slate-600">
            <Construction size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
              Platform extension point
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              {title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
              This route is reserved for an approved bounded context. No business
              workflow is active here yet.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
