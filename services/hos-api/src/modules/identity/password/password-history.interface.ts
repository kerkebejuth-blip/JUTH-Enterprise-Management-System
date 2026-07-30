/** Contract for future password history persistence checks. */
export interface PasswordHistoryStore {
  hasBeenUsed(userId: string, passwordHash: string): Promise<boolean>;
  record(userId: string, passwordHash: string): Promise<void>;
}
