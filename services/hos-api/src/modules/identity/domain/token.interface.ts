/** Supported enterprise token families. */
export type TokenType = 'access' | 'refresh' | 'api_key' | 'service_account';

/** Token metadata used by access, refresh, API key, and service-account flows. */
export interface Token {
  id: string;
  subject: string;
  type: TokenType;
  issuedAt: string;
  expiresAt?: string;
  sessionId?: string;
  scopes: string[];
  metadata?: Record<string, unknown>;
}
