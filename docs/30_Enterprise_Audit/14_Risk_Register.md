# Enterprise Risk Register

## Risk Summary

| ID | Severity | Risk | Evidence | Impact | Owner | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Critical | Database health and connection readiness are simulated. | `services/hos-api/src/database/providers/prisma-provider.ts:33` | Production outages may be invisible; migrations and transactions cannot be trusted. | Backend/Data Architecture | P0 | M |
| R-002 | Critical | Authentication is not implemented or globally enforced. | `services/hos-api/src/core/core.module.ts:24`; `services/hos-api/src/security/authentication.guard.ts:19` | Unauthorized access risk when endpoints are added. | Security/IAM | P0 | L |
| R-003 | Critical | No CI/CD or container baseline found. | Repository search found no `Dockerfile`, Compose, or `.github` workflow. | Deployments are not repeatable or governed. | DevOps | P0 | L |
| R-004 | Critical | Test coverage is almost absent. | Only `services/hos-api/test/app.e2e-spec.ts` found. | Regression risk is unacceptable for hospital software. | QA/Engineering | P0 | L |
| R-005 | High | Production CORS can default open. | `services/hos-api/src/main.ts:30` | Browser-origin abuse risk. | Security | P0 | S |
| R-006 | High | JWT secret is optional. | `services/hos-api/src/config/environment.validation.ts:142` | Token security may be misconfigured. | Security/DevOps | P0 | S |
| R-007 | High | In-memory rate limiting is not horizontally scalable. | `services/hos-api/src/security/rate-limit.guard.ts` | Brute force/rate abuse controls fail across replicas. | Security/Platform | P1 | M |
| R-008 | High | No liveness/readiness health split. | `services/hos-api/src/health/health.controller.ts` | Orchestrators cannot manage traffic safely. | Platform/DevOps | P1 | M |
| R-009 | High | Clinical interoperability implementation absent. | No FHIR/HL7/DICOM source contracts found. | Enterprise hospital integration readiness is low. | Clinical Architecture | P1 | L |
| R-010 | Medium | Documentation includes broken system architecture reference. | `docs/00_HOS_BLUEPRINT.md:17` references missing `SYSTEM_ARCHITECTURE.md`. | Governance traceability gap. | Architecture Governance | P2 | S |
| R-011 | Medium | Placeholder frontend routes appear in application shell. | `apps/staff-portal/src/app/router/Placeholder.tsx:7` | User-facing readiness can be misrepresented. | Frontend | P2 | M |
| R-012 | Medium | Shared API package stores token policy in local storage. | `packages/api/src/interceptors/authInterceptor.ts` | XSS token theft risk if used in production. | Frontend/Security | P1 | M |

## Risk Posture

Current risk posture is High. The system should remain in platform engineering status until R-001 through R-006 are resolved and validated with automated gates.

