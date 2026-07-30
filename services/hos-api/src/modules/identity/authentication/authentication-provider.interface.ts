import type { UserContext } from '../domain';

/** Contract for future authentication providers such as JWT, LDAP, SSO, and OAuth2. */
export interface AuthenticationProvider {
  readonly name: string;
  authenticate(credentials: AuthenticationCredentials): Promise<UserContext>;
}

/** Credential envelope accepted by future authentication providers. */
export interface AuthenticationCredentials {
  strategy: AuthenticationStrategy;
  payload: Record<string, unknown>;
}

/** Supported authentication strategies for the enterprise IAM platform. */
export type AuthenticationStrategy =
  | 'jwt'
  | 'refresh_token'
  | 'api_key'
  | 'service_account'
  | 'sso'
  | 'ldap'
  | 'active_directory'
  | 'oauth2'
  | 'openid_connect'
  | 'saml';
