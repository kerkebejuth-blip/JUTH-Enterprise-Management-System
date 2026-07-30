/** Password policy enforced by future credential flows. */
export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSymbol: boolean;
  historyLimit: number;
  maxAgeDays?: number;
}
