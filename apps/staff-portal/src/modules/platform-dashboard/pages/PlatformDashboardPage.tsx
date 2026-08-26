import {
  Activity,
  ArrowUpRight,
  ClipboardList,
  FileBarChart2,
  FlaskConical,
  HeartPulse,
  Pill,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";

import {
  fetchPlatformHealth,
  type HealthPayload,
} from "../services/health-api";

type ConnectionState = "checking" | "connected" | "unavailable";

interface NavigationCard {
  label: string;
  description: string;
  path: string;
  Icon: LucideIcon;
}

const navigationCards: NavigationCard[] = [
  {
    label: "Clinical workspace",
    description: "Open the shared workspace shell.",
    path: "/workspace",
    Icon: ClipboardList,
  },
  {
    label: "Patients",
    description: "Reserved for the approved patient context.",
    path: "/patients",
    Icon: Users,
  },
  {
    label: "Laboratory",
    description: "Reserved for a future bounded context.",
    path: "/laboratory",
    Icon: FlaskConical,
  },
  {
    label: "Pharmacy",
    description: "Reserved for a future bounded context.",
    path: "/pharmacy",
    Icon: Pill,
  },
  {
    label: "Reports",
    description: "Reserved for future enterprise reporting.",
    path: "/reports",
    Icon: FileBarChart2,
  },
  {
    label: "Administration",
    description: "Reserved for future platform administration.",
    path: "/administration",
    Icon: ShieldCheck,
  },
];

function formatTimestamp(timestamp: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(timestamp));
}

function formatUptime(uptimeSeconds: number): string {
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  return `${hours}h ${minutes}m ${seconds}s`;
}

function StatusBadge({ state }: { state: ConnectionState }): ReactElement {
  const labels: Record<ConnectionState, string> = {
    checking: "Checking",
    connected: "Connected",
    unavailable: "Unavailable",
  };
  const colors: Record<ConnectionState, string> = {
    checking: "bg-amber-50 text-amber-700 ring-amber-200",
    connected: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    unavailable: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${colors[state]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
      {labels[state]}
    </span>
  );
}

/** Provides a platform-only landing page for verifying the running system. */
export default function PlatformDashboardPage(): ReactElement {
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("checking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const loadHealth = useCallback(async () => {
    setConnectionState("checking");
    setErrorMessage(null);

    try {
      const payload = await fetchPlatformHealth();
      setHealth(payload);
      setConnectionState("connected");
    } catch (error) {
      setConnectionState("unavailable");
      setErrorMessage(
        error instanceof Error ? error.message : "Backend health is unavailable.",
      );
    }
  }, []);

  useEffect(() => {
    const healthCheckTimer = window.setTimeout(() => {
      void loadHealth();
    }, 0);
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      window.clearTimeout(healthCheckTimer);
      window.clearInterval(timer);
    };
  }, [loadHealth]);

  const healthStatus = health?.status ?? "unavailable";
  const databaseStatus = health?.database.status ?? "not_configured";

  return (
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
              Platform preview
            </p>
            <h1 className="mt-2 break-words text-3xl font-semibold tracking-tight text-slate-950">
              JUTH Enterprise Hospital Operating System
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              A focused platform workspace for validating the enterprise shell,
              backend connectivity, and runtime health before feature development.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge state={connectionState} />
            <button
              type="button"
              onClick={() => void loadHealth()}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              title="Refresh backend health"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Refresh
            </button>
          </div>
        </div>

        {errorMessage ? (
          <p
            className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))]">
        <MetricCard
          label="Backend connectivity"
          value={connectionState === "connected" ? "Online" : "Offline"}
          detail="Health endpoint"
          Icon={Server}
          tone={connectionState === "connected" ? "success" : "warning"}
        />
        <MetricCard
          label="API version"
          value={health?.version ?? "Unavailable"}
          detail="Current runtime"
          Icon={Activity}
        />
        <MetricCard
          label="Environment"
          value={health?.environment ?? "Unknown"}
          detail="Loaded configuration"
          Icon={ShieldCheck}
        />
        <MetricCard
          label="Health status"
          value={healthStatus}
          detail={`Database: ${databaseStatus}`}
          Icon={HeartPulse}
          tone={health?.status === "ok" ? "success" : "warning"}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Platform navigation
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Extension points reserved for approved future modules.
              </p>
            </div>
            <ArrowUpRight className="text-slate-400" size={20} aria-hidden="true" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {navigationCards.map(({ label, description, path, Icon }) => (
              <Link
                key={label}
                to={path}
                className="group flex items-start gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
              >
                <span className="rounded-lg bg-slate-100 p-2 text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-800">
                    {label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Runtime details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <DetailRow label="Current time" value={currentTime.toLocaleTimeString()} />
            <DetailRow
              label="API response"
              value={health ? formatTimestamp(health.timestamp) : "Awaiting response"}
            />
            <DetailRow
              label="API uptime"
              value={health ? formatUptime(health.uptimeSeconds) : "Unavailable"}
            />
            <DetailRow
              label="Database driver"
              value={health?.database.driver ?? "Not configured"}
            />
          </dl>
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  detail,
  Icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  detail: string;
  Icon: LucideIcon;
  tone?: "neutral" | "success" | "warning";
}): ReactElement {
  const iconColors = {
    neutral: "bg-blue-50 text-blue-700",
    success: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-xl font-semibold capitalize text-slate-950">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{detail}</p>
        </div>
        <span className={`rounded-lg p-2 ${iconColors[tone]}`}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-800">{value}</dd>
    </div>
  );
}
