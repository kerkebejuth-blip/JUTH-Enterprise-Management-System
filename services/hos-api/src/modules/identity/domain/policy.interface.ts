import type { IdentityClaim } from './claim.interface';

/** Policy requirement for policy-based access control. */
export interface Policy {
  key: string;
  description: string;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requiredClaims?: IdentityClaim[];
  requiredScopes?: string[];
}
