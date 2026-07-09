import {
  Activity,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  FlaskConical,
  Pill,
  Plus,
  ReceiptText,
  Stethoscope,
  TrendingUp,
  UserPlus,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { type ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  children: ReactNode
  action?: string
}

type StatisticCardProps = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
  tone: 'teal' | 'blue' | 'amber' | 'rose'
}

type QueueCardProps = {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
}

const statistics: StatisticCardProps[] = [
  {
    label: "Today's Patients",
    value: '184',
    helper: '+12% from yesterday',
    icon: UsersRound,
    tone: 'teal',
  },
  {
    label: "Today's Revenue",
    value: '₦8.42M',
    helper: '72 invoices settled',
    icon: ReceiptText,
    tone: 'blue',
  },
  {
    label: 'Appointments',
    value: '96',
    helper: '18 awaiting confirmation',
    icon: CalendarDays,
    tone: 'amber',
  },
  {
    label: 'Laboratory Requests',
    value: '43',
    helper: '11 urgent samples',
    icon: FlaskConical,
    tone: 'rose',
  },
]

const queues: QueueCardProps[] = [
  {
    title: 'Pharmacy Queue',
    value: '28',
    subtitle: 'Prescriptions awaiting dispensing',
    icon: Pill,
  },
  {
    title: 'Eye Clinic Queue',
    value: '17',
    subtitle: 'Patients waiting for ophthalmology review',
    icon: Stethoscope,
  },
]

const timeline = [
  {
    title: 'New outpatient visit registered',
    meta: 'Patients - 08:42 AM',
  },
  {
    title: 'CBC panel completed for priority sample',
    meta: 'Laboratory - 09:05 AM',
  },
  {
    title: 'Invoice payment reconciled',
    meta: 'Billing - 09:31 AM',
  },
  {
    title: 'Medication ready for pickup',
    meta: 'Pharmacy - 10:12 AM',
  },
]

const quickActions = [
  { label: 'Register patient', icon: UserPlus },
  { label: 'Create appointment', icon: CalendarDays },
  { label: 'Start encounter', icon: ClipboardList },
  { label: 'Request lab test', icon: FlaskConical },
]

const toneClasses: Record<StatisticCardProps['tone'], string> = {
  teal: 'bg-teal-50 text-teal-700 ring-teal-100',
  blue: 'bg-blue-50 text-blue-700 ring-blue-100',
  amber: 'bg-amber-50 text-amber-700 ring-amber-100',
  rose: 'bg-rose-50 text-rose-700 ring-rose-100',
}

function DashboardCard({ title, children, action }: DashboardCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-slate-200 px-5">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        {action ? (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900"
          >
            {action}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </section>
  )
}

function StatisticCard({ label, value, helper, icon: Icon, tone }: StatisticCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <div className="flex items-center justify-between gap-4">
        <div
          className={`grid size-10 place-items-center rounded-lg ring-1 ring-inset ${toneClasses[tone]}`}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          <TrendingUp className="size-3" aria-hidden="true" />
          Live
        </span>
      </div>
      <p className="mt-5 text-2xl font-semibold text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
      <p className="mt-2 text-xs text-slate-500">{helper}</p>
    </article>
  )
}

function QueueCard({ title, value, subtitle, icon: Icon }: QueueCardProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-teal-700 ring-1 ring-inset ring-slate-200">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">{title}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-medium text-teal-700">Hospital operations</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
              Welcome back, Admin User
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Monitor clinical throughput, revenue activity, queues, and service
              requests across the Hospital Operating System.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white shadow-sm shadow-teal-900/20 transition hover:bg-teal-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            New workflow
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => (
          <StatisticCard key={statistic.label} {...statistic} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <DashboardCard title="Service Queues" action="View all queues">
            <div className="grid gap-4 md:grid-cols-2">
              {queues.map((queue) => (
                <QueueCard key={queue.title} {...queue} />
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex min-h-24 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm shadow-slate-950/5 transition hover:border-teal-200 hover:bg-teal-50"
                >
                  <action.icon className="size-5 text-teal-700" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </DashboardCard>
        </div>

        <DashboardCard title="Activity Timeline" action="Open audit log">
          <ol className="space-y-5">
            {timeline.map((event, index) => (
              <li key={event.title} className="relative flex gap-3">
                <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-100">
                  <Activity className="size-3.5" aria-hidden="true" />
                </span>
                {index < timeline.length - 1 ? (
                  <span className="absolute left-3.5 top-8 h-8 w-px bg-slate-200" />
                ) : null}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.meta}</p>
                </div>
              </li>
            ))}
          </ol>
        </DashboardCard>
      </section>
    </div>
  )
}
