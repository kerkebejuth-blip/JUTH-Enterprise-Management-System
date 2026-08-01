# Prioritized Enterprise Action Plan

## P0 - Stop-the-Line Platform Gaps

| Action | Evidence | Outcome | Effort |
| --- | --- | --- | --- |
| Implement real Prisma Client provider and PostgreSQL health query. | `services/hos-api/src/database/providers/prisma-provider.ts:33` | Persistence readiness becomes verifiable. | M |
| Implement authentication provider strategy and enforce authentication globally. | `services/hos-api/src/core/core.module.ts:24`; `services/hos-api/src/security/authentication.guard.ts:19` | Protected APIs fail closed by default. | L |
| Enforce production security validation for `DATABASE_URL`, `JWT_SECRET`, CORS origins, cookie security, and secret entropy. | `services/hos-api/src/config/environment.validation.ts` | Misconfigured production startup fails safely. | S |
| Add CI pipeline with lint, build, unit tests, e2e tests, dependency audit, and coverage thresholds. | No CI workflow found. | Engineering gates become repeatable. | L |
| Establish automated test baseline. | Only `services/hos-api/test/app.e2e-spec.ts` found. | Platform changes become regression-safe. | L |

## P1 - Enterprise Operational Foundation

| Action | Evidence | Outcome | Effort |
| --- | --- | --- | --- |
| Add Dockerfile and environment-specific deployment configuration. | No Dockerfile or Compose file found. | Reproducible deployment baseline. | M |
| Add `/health/live`, `/health/ready`, `/health/info`, and `/health/version`. | `services/hos-api/src/health/health.controller.ts` | Operations can safely route and monitor service health. | M |
| Replace in-memory rate limiting with distributed, proxy-aware rate limiting. | `services/hos-api/src/security/rate-limit.guard.ts` | Multi-instance security control. | M |
| Implement structured logging with redaction and correlation fields. | `services/hos-api/src/logging/enterprise-logger.service.ts` | Audit-safe observability. | M |
| Define clinical interoperability foundation for FHIR, HL7, DICOM, and terminology. | No implementation contracts found. | Hospital integration readiness. | L |

## P2 - Architecture Governance Hardening

| Action | Evidence | Outcome | Effort |
| --- | --- | --- | --- |
| Consolidate duplicate database contracts. | `services/hos-api/src/database/interfaces` and `services/hos-api/src/database/repositories`. | One source of truth for persistence architecture. | M |
| Move tactical domain contracts out of database namespace. | `services/hos-api/src/database/contracts`. | Clean domain/infrastructure separation. | M |
| Enable strict TypeScript rules. | `services/hos-api/eslint.config.mjs:29`; `services/hos-api/tsconfig.json`. | Stronger correctness guarantees. | M |
| Quarantine or remove active `archive/` folder from production source tree. | `archive/` contains legacy/mock code. | Cleaner governance boundary. | M |
| Replace frontend reserved foundation route strategy with governed capability registry. | `apps/staff-portal/src/app/router/Placeholder.tsx:7`. | Clear module readiness state. | M |

## P3 - Documentation and Traceability

| Action | Evidence | Outcome | Effort |
| --- | --- | --- | --- |
| Add missing `docs/04_Architecture/SYSTEM_ARCHITECTURE.md` or fix blueprint link. | `docs/00_HOS_BLUEPRINT.md:17`. | Documentation graph becomes consistent. | S |
| Add ADRs for NestJS, Prisma, IAM, frontend, deployment, observability, and interoperability. | Only one ADR observed. | Decision traceability improves. | M |
| Replace starter API README residue. | `services/hos-api/README.md`. | Official onboarding quality improves. | S |

## Sprint Recommendation

Before Sprint 007 business or clinical modules, execute a hardening sprint focused on P0 and selected P1 items. Proceeding directly to clinical functionality would create unsafe dependencies on unfinished platform foundations.

