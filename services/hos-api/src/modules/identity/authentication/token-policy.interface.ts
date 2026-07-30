/** Token expiration and rotation policy settings. */
export interface TokenPolicy {
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
  rotationStrategy: 'rotate_on_use' | 'fixed_lifetime';
  blacklistEnabled: boolean;
}
