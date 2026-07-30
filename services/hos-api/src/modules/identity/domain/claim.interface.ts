import type { ClaimValue } from '../../../security';

/** Identity claim assigned to a user, session, or token. */
export interface IdentityClaim {
  type: string;
  value: ClaimValue;
  issuer?: string;
}
