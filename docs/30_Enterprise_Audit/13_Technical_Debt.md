# Technical Debt Register

Debt score: 44/100

## High-Severity Debt

| Severity | Location | Debt | Consequence | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| Critical | `services/hos-api/src/database/providers/prisma-provider.ts` | Database provider is a reserved foundation boundary, not a real Prisma adapter. | Misleading persistence readiness. | Implement Prisma Client adapter. | P0 | M |
| Critical | `services/hos-api/src/security/authentication.guard.ts` | Authentication is not implemented. | Protected enterprise workflows cannot be safely exposed. | Implement authentication provider strategy. | P0 | L |
| High | `services/hos-api/eslint.config.mjs:29` | `no-explicit-any` disabled. | Strict TypeScript claim is not enforced. | Enable rule and remediate violations. | P2 | M |
| High | `services/hos-api/tsconfig.json` | `noImplicitAny` is false. | Strict typing is weakened at compiler level. | Enable `noImplicitAny` and strict mode. | P2 | M |
| High | `archive/` | Large archive remains inside active repo. | Confuses production source and audit surface. | Move or quarantine archive. | P1 | M |
| High | `packages/*` | Placeholder packages and minimal shared package implementation. | Workspace complexity without architectural payoff. | Implement or remove/defer packages. | P2 | M |

## Medium-Severity Debt

| Severity | Location | Debt | Consequence | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| Medium | `packages/api/src/interceptors/responseInterceptor.ts:11` | Console logging in shared API interceptor. | Noisy logs and weak observability practice. | Remove or replace with logger abstraction. | P2 | S |
| Medium | `apps/staff-portal/src/app/router/Placeholder.tsx` | Reserved routes in production app shell. | Overstates module readiness. | Gate reserved foundation routes behind roadmap/dev flags. | P2 | M |
| Medium | root inventory files | Generated tree/status files at repository root. | Clutters source root and causes drift. | Move generated artifacts to docs/audit or ignore. | P3 | S |
| Medium | `services/hos-api/src/database/interfaces` | Duplicate persistence abstraction set. | Contract drift. | Consolidate persistence contracts. | P2 | M |

## Debt Conclusion

Technical debt is mostly architectural scaffolding debt rather than messy implementation debt. That is better than uncontrolled feature debt, but it must be resolved before business modules depend on these foundations.

