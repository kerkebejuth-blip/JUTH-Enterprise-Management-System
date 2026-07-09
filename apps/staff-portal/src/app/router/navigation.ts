import {
  Activity,
  BarChart3,
  Building2,
  ClipboardList,
  FlaskConical,
  Home,
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

export type AppRouteId =
  | 'dashboard'
  | 'patients'
  | 'clinics'
  | 'pharmacy'
  | 'laboratory'
  | 'radiology'
  | 'billing'
  | 'inventory'
  | 'hr'
  | 'reports'
  | 'administration'
  | 'settings'

export type NavigationItem = {
  id: AppRouteId
  label: string
  path: string
  icon: LucideIcon
  description: string
}

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: Home, description: 'Operational command center' },
  { id: 'patients', label: 'Patients', path: '/patients', icon: UserRound, description: 'Patient registry and clinical encounters' },
  { id: 'clinics', label: 'Clinics', path: '/clinics', icon: Stethoscope, description: 'Clinic schedules, visits, and queues' },
  { id: 'pharmacy', label: 'Pharmacy', path: '/pharmacy', icon: Pill, description: 'Medication dispensing and stock controls' },
  { id: 'laboratory', label: 'Laboratory', path: '/laboratory', icon: FlaskConical, description: 'Orders, specimens, and diagnostic results' },
  { id: 'radiology', label: 'Radiology', path: '/radiology', icon: Activity, description: 'Imaging requests and reporting workflows' },
  { id: 'billing', label: 'Billing', path: '/billing', icon: ReceiptText, description: 'Invoices, claims, payments, and revenue controls' },
  { id: 'inventory', label: 'Inventory', path: '/inventory', icon: Package, description: 'Stores, procurement, and supply chain operations' },
  { id: 'hr', label: 'HR', path: '/hr', icon: Users, description: 'Workforce administration and scheduling' },
  { id: 'reports', label: 'Reports', path: '/reports', icon: BarChart3, description: 'Enterprise analytics and statutory reporting' },
  { id: 'administration', label: 'Administration', path: '/administration', icon: ShieldCheck, description: 'Security, RBAC, departments, and governance' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings, description: 'System configuration and platform preferences' },
]

export const organizationContext = {
  name: 'JUTH',
  facility: 'Jos University Teaching Hospital',
  region: 'Plateau State Health Network',
  icon: Building2,
}

export const quickActions = [
  { label: 'New encounter', icon: ClipboardList },
  { label: 'Register patient', icon: UserRound },
  { label: 'Create order', icon: FlaskConical },
]
