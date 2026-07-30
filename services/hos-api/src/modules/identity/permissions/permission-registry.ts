import type { Permission } from '../domain';

/** Central registry of enterprise permissions available to modules. */
export const PERMISSION_REGISTRY: Record<string, Permission> = {
  PATIENT_READ: {
    key: 'PATIENT_READ',
    description: 'Read patient records.',
    module: 'patients',
    feature: 'registration',
    action: 'read',
  },
  PATIENT_CREATE: {
    key: 'PATIENT_CREATE',
    description: 'Create patient records.',
    module: 'patients',
    feature: 'registration',
    action: 'create',
  },
  PATIENT_EDIT: {
    key: 'PATIENT_EDIT',
    description: 'Edit patient records.',
    module: 'patients',
    feature: 'registration',
    action: 'edit',
  },
  LAB_APPROVE: {
    key: 'LAB_APPROVE',
    description: 'Approve laboratory results.',
    module: 'laboratory',
    action: 'approve',
  },
  PHARMACY_DISPENSE: {
    key: 'PHARMACY_DISPENSE',
    description: 'Dispense medication orders.',
    module: 'pharmacy',
    action: 'dispense',
  },
  RADIOLOGY_REPORT: {
    key: 'RADIOLOGY_REPORT',
    description: 'Finalize radiology reports.',
    module: 'radiology',
    action: 'report',
  },
};

/** Returns all registered enterprise permission definitions. */
export function listRegisteredPermissions(): Permission[] {
  return Object.values(PERMISSION_REGISTRY);
}
