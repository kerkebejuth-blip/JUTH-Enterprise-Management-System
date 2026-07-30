/** Contract for token revocation and blacklist checks. */
export interface TokenRevocationStore {
  revoke(tokenId: string, reason: string): Promise<void>;
  isRevoked(tokenId: string): Promise<boolean>;
}
