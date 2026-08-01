# Performance Audit

Score: 45/100

## Evidence Reviewed

- Request timing interceptor and middleware in `services/hos-api/src`.
- Database observability reserved foundation under `services/hos-api/src/database/observability`.
- Staff portal routing and layout under `apps/staff-portal/src`.
- Build tooling under `turbo.json`, Vite, and package manifests.

## Strengths

- Request timing is globally registered in `services/hos-api/src/main.ts:48`.
- Database observability service exists as a reserved foundation.
- Staff portal uses Vite and modern React tooling.
- Turbo provides build task orchestration.

## Findings

| Severity | Location | Finding | Performance Impact | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| High | `services/hos-api/src/database/providers/prisma-provider.ts` | Database latency is measured without a real query. | Health and performance metrics are misleading. | Measure live connection/query latency. | P1 | M |
| Medium | `services/hos-api/src/security/rate-limit.guard.ts` | Rate-limit store is in process memory. | Multi-instance scaling produces inconsistent throttling. | Use distributed rate limiter. | P1 | M |
| Medium | `apps/staff-portal/src/app/router/router.tsx` | Routes are statically imported; no lazy loading was observed. | Bundle growth risk as modules are added. | Introduce route-level lazy loading per feature module. | P2 | M |
| Medium | `apps/staff-portal/src/modules/patient-workspace` | Patient workspace appears component-rich before performance profiling exists. | Future render cost risk for clinical screens. | Add profiling, virtualization rules, and performance tests. | P2 | M |
| Low | `turbo.json` | No bundle analysis, performance budget, or cache-input policy exists. | Performance regressions may go unnoticed. | Add bundle analysis and performance budgets to CI. | P3 | M |

## Performance Conclusion

The repository has hooks for performance visibility, but no mature performance engineering practice yet. The main concern is misleading database health plus absent frontend bundle and render budgets.

