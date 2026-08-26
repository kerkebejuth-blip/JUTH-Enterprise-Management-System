import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../../theme";

export default function Topbar() {
  const { mode, setMode } = useTheme();

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="min-w-0 pl-14 md:pl-0">
        <p className="truncate text-sm font-semibold text-slate-950">
          Hospital Operating System
        </p>
        <p className="hidden text-xs text-slate-500 sm:block">
          Enterprise clinical workspace
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label="Search workspace"
          title="Search workspace"
        >
          <Search size={19} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-left transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label="Open user session menu"
          title="User session"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
            JD
          </span>
          <span className="hidden text-sm font-semibold text-slate-800 lg:block">
            JUTH Staff
          </span>
        </button>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          aria-label="Toggle theme"
          title="Toggle theme"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}
