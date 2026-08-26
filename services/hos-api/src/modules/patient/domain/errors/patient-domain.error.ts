/** Framework-independent error raised by Patient domain invariants. */
export class PatientDomainError extends Error {
  /** Creates a typed Patient domain error. */
  constructor(
    message: string,
    public readonly code = 'PATIENT_DOMAIN_ERROR',
    public readonly details: Readonly<Record<string, string>> = {},
  ) {
    super(message);
    this.name = 'PatientDomainError';
  }

  /** Creates one error from the first broken rule while retaining all details. */
  static fromBrokenRules(
    rules: readonly { readonly message: string }[],
  ): PatientDomainError {
    return new PatientDomainError(
      rules.map((rule) => rule.message).join(' '),
      'PATIENT_BUSINESS_RULE_VIOLATION',
      Object.fromEntries(
        rules.map((rule, index) => [`rule${index + 1}`, rule.message]),
      ),
    );
  }
}
