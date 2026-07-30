import type { PolicyRequirement } from '../../../security';

/** Creates a test-only authorization policy requirement. */
export function createMockPolicyRequirement(
  overrides: Partial<PolicyRequirement> = {},
): PolicyRequirement {
  return {
    name: 'test-policy',
    ...overrides,
  };
}
