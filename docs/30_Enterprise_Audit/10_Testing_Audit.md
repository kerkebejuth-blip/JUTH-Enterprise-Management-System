# Testing Audit

Score: 18/100

## Evidence Reviewed

- Test file search found only `services/hos-api/test/app.e2e-spec.ts`.
- Root and package scripts in `package.json` files.
- Staff portal dev dependencies include Vitest and Playwright, but no `test` script.
- Placeholder package test scripts echo no tests configured.

## Findings

| Severity | Location | Finding | Testing Impact | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| Critical | repository test search | Only one e2e spec was found across apps, services, and packages. | Enterprise behavior is largely unverified. | Establish unit, integration, contract, e2e, and frontend test suites. | P0 | L |
| High | `services/hos-api/test/app.e2e-spec.ts` | E2E coverage is limited to health. | Bootstrap security, interceptors, exception filters, versioning, and database health are untested. | Add API platform e2e coverage for middleware and global policies. | P1 | M |
| High | `apps/staff-portal/package.json` | No test script exists for the staff portal. | Frontend routing, accessibility, layout, and state behavior are not gated. | Add Vitest, React Testing Library, and Playwright scripts. | P1 | M |
| Medium | `packages/*/package.json` | Shared packages mostly emit "No tests configured". | Shared contracts can regress silently. | Add package-level unit/type tests or remove unused packages. | P2 | M |
| Medium | root `package.json` | No coverage script or minimum threshold exists. | Test maturity cannot be measured. | Add coverage task and thresholds by package. | P2 | M |

## Testing Conclusion

Testing is the lowest maturity area. The repository can build, but it cannot yet provide the safety net required for hospital-grade software delivery.

