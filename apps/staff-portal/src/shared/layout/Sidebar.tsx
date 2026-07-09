import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ChevronLeft,
  FlaskConical,
  Gauge,
  Home,
  LogOut,
  Package,
  Pill,
  ReceiptText,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { organizationContext } from '../../app/router/navigation'
import { cn } from '../utils/cn'

type SidebarProps = {
  collapsed: boolean
  mobileOpen: boolean
  onCloseMobile: () => void
}

type SidebarLink = {
  label: string
  path: string
  icon: LucideIcon
  end?: boolean
}

type NavigationGroup = {
  label: string
  items: SidebarLink[]
}

const navigationGroups: NavigationGroup[] = [
  {
    label: 'Workspace',
    items: [{ label: 'Dashboard', path: '/', icon: Home, end: true }],
  },
  {
    label: 'Clinical',
    items: [
      { label: 'Patients', path: '/patients', icon: UserRound },
      { label: 'Clinics', path: '/clinics', icon: Stethoscope },
      { label: 'Laboratory', path: '/laboratory', icon: FlaskConical },
      { label: 'Pharmacy', path: '/pharmacy', icon: Pill },
      { label: 'Radiology', path: '/radiology', icon: Activity },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Billing', path: '/billing', icon: ReceiptText },
      { label: 'Inventory', path: '/inventory', icon: Package },
      { label: 'HR', path: '/hr', icon: Users },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Reports', path: '/reports', icon: BarChart3 },
      { label: 'Executive Dashboard', path: '/executive-dashboard', icon: Gauge },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Administration', path: '/administration', icon: ShieldCheck },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
]

export function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const OrganizationIcon = organizationContext.icon ?? Building2

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-950/5 transition-[width,transform] duration-300 lg:translate-x-0',
        collapsed && 'lg:w-[5.25rem]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )}
      aria-label="Application sidebar"
    >
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-700 text-white shadow-sm shadow-teal-900/20">
          <OrganizationIcon className="size-5" aria-hidden="true" />
        </div>

        <div className={cn('min-w-0', collapsed && 'lg:hidden')}>
          <p className="truncate text-sm font-semibold text-slate-950">
            {organizationContext.name}
          </p>
          <p className="truncate text-xs text-slate-500">
            {organizationContext.region}
          </p>
        </div>

        <button
          type="button"
          className="ml-auto grid size-9 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 lg:hidden"
          onClick={onCloseMobile}
          aria-label="Close sidebar"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav
        className="flex-1 space-y-5 overflow-y-auto px-3 py-4"
        aria-label="Primary navigation"
      >
        {navigationGroups.map((group) => (
          <section key={group.label} className="space-y-1">
            <p
              className={cn(
                'px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400',
                collapsed && 'lg:px-0 lg:text-center lg:text-[10px]',
              )}
            >
              <span className={cn(collapsed && 'lg:sr-only')}>
                {group.label}
              </span>
              <span
                aria-hidden="true"
                className={cn('hidden h-px bg-slate-200', collapsed && 'lg:block')}
              />
            </p>

            {group.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    'group relative flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition',
                    'focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2',
                    isActive
                      ? 'bg-teal-50 text-teal-800 ring-1 ring-inset ring-teal-100'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
                    collapsed && 'lg:justify-center lg:px-0',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        'absolute left-0 top-2 hidden h-7 w-1 rounded-r-full bg-teal-700',
                        isActive && 'block',
                      )}
                    />
                    <item.icon
                      className={cn(
                        'size-5 shrink-0',
                        isActive ? 'text-teal-700' : 'text-slate-400 group-hover:text-slate-700',
                      )}
                      aria-hidden="true"
                    />
                    <span className={cn('truncate', collapsed && 'lg:hidden')}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </section>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <div
          className={cn(
            'mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3',
            collapsed && 'lg:hidden',
          )}
        >
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4 text-teal-700" aria-hidden="true" />
            <p className="truncate text-xs font-semibold text-slate-700">
              HOS Core Platform
            </p>
          </div>
          <p className="mt-1 text-xs text-slate-500">Enterprise operations</p>
        </div>

        <button
          type="button"
          className={cn(
            'flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950',
            collapsed && 'lg:justify-center lg:px-0',
          )}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="size-5 shrink-0 text-slate-400" aria-hidden="true" />
          <span className={cn('truncate', collapsed && 'lg:hidden')}>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
