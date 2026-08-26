import { BusinessRuleEvaluator, type BusinessRule } from './business-rule';

class StaticRule implements BusinessRule {
  constructor(
    public readonly message: string,
    private readonly broken: boolean,
  ) {}

  isBroken(): boolean {
    return this.broken;
  }
}

describe('BusinessRuleEvaluator', () => {
  it('returns broken rules and satisfaction state', () => {
    const brokenRule = new StaticRule('Broken', true);
    const rules = [brokenRule, new StaticRule('Satisfied', false)];

    expect(BusinessRuleEvaluator.brokenRules(rules)).toEqual([brokenRule]);
    expect(BusinessRuleEvaluator.allSatisfied(rules)).toBe(false);
  });
});
