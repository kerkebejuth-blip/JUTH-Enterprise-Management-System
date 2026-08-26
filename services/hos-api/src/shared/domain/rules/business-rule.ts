/** Business rule contract for reusable domain validation. */
export interface BusinessRule {
  readonly message: string;
  isBroken(): boolean;
}

/** Evaluates business rules without binding to a framework exception mechanism. */
export class BusinessRuleEvaluator {
  /** Returns all broken business rules from the supplied rule list. */
  static brokenRules(rules: readonly BusinessRule[]): readonly BusinessRule[] {
    return rules.filter((rule) => rule.isBroken());
  }

  /** Returns true when every supplied business rule is satisfied. */
  static allSatisfied(rules: readonly BusinessRule[]): boolean {
    return this.brokenRules(rules).length === 0;
  }
}
