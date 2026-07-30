import type { IdentityClaim } from './claim.interface';

/** User domain model reserved for future identity persistence. */
export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  roles: string[];
  permissions: string[];
  claims: IdentityClaim[];
  departmentId?: string;
  tenantId?: string;
  facilityId?: string;
  isActive: boolean;
}
