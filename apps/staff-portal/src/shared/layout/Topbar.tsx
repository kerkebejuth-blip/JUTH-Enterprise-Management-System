import {
  Bell,
  Building2,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
} from 'lucide-react'
import { useState } from 'react'

import { cn } from '../utils/cn'

type CurrentUser = {
  name: string
  role: string
  initials: string
}

type TopbarProps = {
  user?: CurrentUser
  isDarkMode?: boolean
  onOpenMobileMenu?: () => void
  onToggleTheme?: () => void
  onLogout?: () => void
}

const defaultUser: CurrentUser = {
  name: 'Admin User',
  role: 'System Administrator',
  initials: 'AU',
}

export function Topbar({
  user = defaultUser,
  isDarkMode = false,
  onOpenMobileMenu,
  onToggleTheme,
  onLogout,
}: TopbarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const ThemeIcon = isDarkMode ? Sun : Moon

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50 hover:text-slate-950 lg:hidden"
          aria-label="Open mobile menu"
          onClick={onOpenMobileMenu}
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-700 text-white shadow-sm shadow-teal-900/20">
            <Building2 className="size-5" aria-hidden="true" />
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold text-slate-950">
              HOS Core Platform
            </p>
            <p className="truncate text-xs text-slate-500">
              Hospital Operating System
            </p>
          </div>
        </div>

        <div className="hidden h-10 w-full max-w-xl items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-500 md:flex">
          <Search className="size-4" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search patients, staff, invoices, orders"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50 hover:text-slate-950 md:hidden"
            aria-label="Open search"
            onClick={() => setIsMobileSearchOpen((value) => !value)}
          >
            <Search className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50 hover:text-slate-950"
            aria-label="View notifications"
          >
            <Bell className="size-5" aria-hidden="true" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50 hover:text-slate-950"
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={onToggleTheme}
          >
            <ThemeIcon className="size-5" aria-hidden="true" />
          </button>

          <div className="relative">
            <button
              type="button"
              className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 shadow-sm shadow-slate-950/5 transition hover:bg-slate-50"
              aria-label="Open profile menu"
              aria-expanded={isProfileMenuOpen}
              onClick={() => setIsProfileMenuOpen((value) => !value)}
            >
              <span className="grid size-8 place-items-center rounded-md bg-slate-900 text-xs font-semibold text-white">
                {user.initials}
              </span>
              <span className="hidden min-w-0 text-left sm:block">
                <span className="block truncate text-xs font-semibold text-slate-950">
                  {user.name}
                </span>
                <span className="block truncate text-[11px] text-slate-500">
                  {user.role}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  'hidden size-4 text-slate-400 transition sm:block',
                  isProfileMenuOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>

            {isProfileMenuOpen ? (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-950/10">
                <div className="border-b border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
                      {user.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">{user.role}</p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <UserRound className="size-4 text-slate-400" aria-hidden="true" />
                    Profile
                  </button>
                  <button
                    type="button"
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <Settings className="size-4 text-slate-400" aria-hidden="true" />
                    Account settings
                  </button>
                  <button
                    type="button"
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    <ShieldCheck className="size-4 text-teal-700" aria-hidden="true" />
                    Security
                  </button>
                </div>

                <div className="border-t border-slate-200 p-2">
                  <button
                    type="button"
                    className="flex min-h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                    onClick={onLogout}
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {isMobileSearchOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-500">
            <Search className="size-4" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search HOS"
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      ) : null}
    </header>
  )
}
