/** Supported authorization claim value primitives. */
export type ClaimValue = string | number | boolean | string[];

/** Authorization claim carried by a future authenticated principal. */
export interface Claim {
  type: string;
  value: ClaimValue;
}

/** Authorization policy requirement contract. */
export interface PolicyRequirement {
  name: string;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  requiredClaims?: Claim[];
  requiredDepartments?: string[];
  requiredFacilities?: string[];
  requiredTenants?: string[];
  sessionRequired?: boolean;
}

/** Principal shape reserved for future authentication integration. */
export interface SecurityPrincipal {
  userId?: string;
  sessionId?: string;
  departmentId?: string;
  facilityId?: string;
  tenantId?: string;
  roles: string[];
  permissions: string[];
  claims: Claim[];
}
