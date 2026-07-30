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

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white">
      <div className="p-6 text-2xl font-bold">JUTH HOS</div>

      <nav className="space-y-1 px-3">
        {items.map(({ label, path, Icon }) => (
          <NavLink
            key={label}

            to={path}

            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg p-3 transition

                            ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
            }
          >
            <Icon size={20} />

            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
