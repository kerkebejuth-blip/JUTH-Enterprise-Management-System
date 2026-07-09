import {
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Search,
  ShieldCheck,
} from 'lucide-react'

import { quickActions } from '../../app/router/navigation'
import { Breadcrumbs } from '../navigation/Breadcrumbs'
import { ButtonIcon } from '../ui/ButtonIcon'

type TopNavigationProps = {
  sidebarCollapsed: boolean
  onToggleSidebar: () => void
  onOpenMobileSidebar: () => void
}

export function TopNavigation({
  sidebarCollapsed,
  onToggleSidebar,
  onOpenMobileSidebar,
}: TopNavigationProps) {
  const ToggleIcon = sidebarCollapsed ? ChevronsRight : ChevronsLeft

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <ButtonIcon label="Open navigation" icon={Menu} className="lg:hidden" onClick={onOpenMobileSidebar} />
        <ButtonIcon
          label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          icon={ToggleIcon}
          className="hidden lg:grid"
          onClick={onToggleSidebar}
        />

        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        <div className="hidden h-10 w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-500 md:flex">
          <Search className="size-4" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search patients, visits, orders"
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5 hover:bg-slate-50"
            >
              <action.icon className="size-4 text-teal-700" aria-hidden="true" />
              {action.label}
            </button>
          ))}
        </div>

        <ButtonIcon label="Notifications" icon={Bell} />

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 sm:flex">
          <ShieldCheck className="size-4 text-teal-700" aria-hidden="true" />
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-900">Admin User</p>
            <p className="text-[11px] text-slate-500">System Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
