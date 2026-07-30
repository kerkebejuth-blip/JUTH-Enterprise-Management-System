/** Session context propagated during authorization decisions. */
export interface SessionContext {
  sessionId?: string;
  tenantId?: string;
  departmentId?: string;
  facilityId?: string;
  issuedAt?: string;
}
