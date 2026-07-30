import type { IdentityClaim } from './claim.interface';

/** Request-time user context consumed by authorization policies. */
export interface UserContext {
  userId?: string;
  sessionId?: string;
  departmentId?: string;
  tenantId?: string;
  facilityId?: string;
  roles: string[];
  permissions: string[];
  claims: IdentityClaim[];
}
