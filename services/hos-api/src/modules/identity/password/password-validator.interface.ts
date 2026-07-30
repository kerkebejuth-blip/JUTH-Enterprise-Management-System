import type { PasswordPolicy } from './password-policy.interface';

/** Contract for validating passwords against enterprise policy. */
export interface PasswordValidator {
  validate(password: string, policy: PasswordPolicy): PasswordValidationResult;
}

/** Result produced by password validation. */
export interface PasswordValidationResult {
  valid: boolean;
  violations: string[];
}
