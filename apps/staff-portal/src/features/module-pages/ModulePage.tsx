import { ArrowUpRight, CalendarClock, ClipboardCheck, UsersRound } from 'lucide-react'

import { type NavigationItem, organizationContext } from '../../app/router/navigation'

type ModulePageProps = {
  module: NavigationItem
}

const metrics = [
  { label: 'Active workflows', value: '24', delta: '+8.2%', icon: ClipboardCheck },
  { label: 'Pending reviews', value: '7', delta: '-3.1%', icon: CalendarClock },
  { label: 'Assigned staff', value: '146', delta: '+2.4%', icon: UsersRound },
]

export function ModulePage({ module }: ModulePageProps) {
  const Icon = module.icon

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_22rem] lg:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-lg bg-teal-700 text-white">
              <Icon className="size-6" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-teal-700">HOS module</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                {module.label}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {module.description}. This workspace is ready for domain use cases,
                data contracts, and role-aware hospital operations.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Facility context
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">
              {organizationContext.facility}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Enterprise shell connected to core platform services.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
          >
            <div className="flex items-center justify-between gap-3">
              <metric.icon className="size-5 text-teal-700" aria-hidden="true" />
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                {metric.delta}
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-5 text-3xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-1 text-sm text-slate-500">{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_24rem]">
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-950">Operational worklist</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {['Triage review', 'Consultant approval', 'Discharge summary'].map((item, index) => (
              <div key={item} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="font-medium text-slate-900">{item}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Queue #{index + 1} assigned to {module.label}
                  </p>
                </div>
                <span className="w-fit rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-base font-semibold text-slate-950">Domain readiness</h2>
          <div className="mt-4 space-y-4">
            {['Routes', 'Layout', 'RBAC hooks', 'API contracts'].map((item) => (
              <div key={item}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item}</span>
                  <span className="text-slate-500">Ready</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-4/5 rounded-full bg-teal-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
