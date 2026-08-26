import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Breadcrumbs from "./Breadcrumbs";

export default function MainLayout() {
  const [isNavigationOpen, setNavigationOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <button
        type="button"
        className="fixed left-4 top-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
        aria-label={isNavigationOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isNavigationOpen}
        onClick={() => setNavigationOpen((open) => !open)}
      >
        {isNavigationOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>

      {isNavigationOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-slate-950/40 md:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setNavigationOpen(false)}
        />
      ) : null}

      <Sidebar
        isOpen={isNavigationOpen}
        onNavigate={() => setNavigationOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col md:pl-72">
        <Topbar />

        <Breadcrumbs />

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
