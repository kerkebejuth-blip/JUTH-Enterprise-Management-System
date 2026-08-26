import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Pill,
  FlaskConical,
  ScanLine,
  CreditCard,
  Boxes,
  UsersRound,
  FileBarChart2,
  Shield,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarItem {
  label: string;
  path: string;
  Icon: LucideIcon;
}

interface SidebarProps {
  isOpen: boolean;
  onNavigate: () => void;
}

const items: SidebarItem[] = [
  { label: "Dashboard", path: "/", Icon: LayoutDashboard },
  { label: "Patients", path: "/patients", Icon: Users },
  { label: "Clinics", path: "/clinics", Icon: Stethoscope },
  { label: "Pharmacy", path: "/pharmacy", Icon: Pill },
  { label: "Laboratory", path: "/laboratory", Icon: FlaskConical },
  { label: "Radiology", path: "/radiology", Icon: ScanLine },
  { label: "Billing", path: "/billing", Icon: CreditCard },
  { label: "Inventory", path: "/inventory", Icon: Boxes },
  { label: "HR", path: "/hr", Icon: UsersRound },
  { label: "Reports", path: "/reports", Icon: FileBarChart2 },
  { label: "Administration", path: "/administration", Icon: Shield },
  { label: "Settings", path: "/settings", Icon: Settings },
];

export default function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-72 overflow-y-auto bg-slate-950 text-white transition-transform md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Primary navigation"
    >
      <div className="border-b border-white/10 px-6 py-5">
        <p className="text-lg font-bold tracking-wide">JUTH HOS</p>
        <p className="mt-1 text-xs text-slate-400">Staff Portal</p>
      </div>

      <nav className="space-y-1 px-3">
        {items.map(({ label, path, Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
            onClick={onNavigate}
          >
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
