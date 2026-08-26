import { useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);
  const label =
    segments.length === 0 ? "Platform dashboard" : segments.join(" / ");

  return (
    <div className="border-b border-slate-200 bg-white px-4 py-3 text-xs font-medium capitalize text-slate-500 sm:px-6">
      <span className="text-slate-400">JUTH HOS</span>
      <span className="mx-2 text-slate-300" aria-hidden="true">
        /
      </span>
      <span>{label}</span>
    </div>
  );
}
