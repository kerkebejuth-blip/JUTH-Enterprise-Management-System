# JUTH HOS Architecture Realignment Checkpoint

**Audit date:** 2026-08-28  
**Repository:** JUTH-Enterprise-Management-System  
**Observed branch:** `main`  
**HEAD:** `49fdc6d91cae746e8c9ddbe59fdca57cf782c9af`  
**Checkpoint status:** Audit complete; implementation paused pending review

## 1. Safety Report

The realignment safety check found no staged, unstaged, or untracked changes. The
working tree is clean and `main` is synchronized with `origin/main` at the
observed commit. The reflog records that the former
`sprint/006b-platform-foundation` reference was renamed to `main`; no automatic
branch switch was performed during this checkpoint.

The previous broad capability work is present in the existing `HEAD` commit. It
includes the Staff Portal preview, platform foundations, Patient bounded context,
Patient infrastructure, API presentation foundation, and governance documents.
The current realignment added no implementation changes.

**Classification:** `NO CHANGE AFTER REALIGNMENT CHECKPOINT`  
**Destructive operations:** none  
**Migrations created by this checkpoint:** none  
**Dependencies changed by this checkpoint:** none

## 2. Existing Architecture

| Area                | Evidence                                                                                                                                             | Assessment                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Workspace           | `pnpm-workspace.yaml` includes `apps/*`, `services/*`, and `packages/*`.                                                                             | Present                                            |
| Build orchestration | `turbo.json` defines `build`, `typecheck`, `lint`, `test`, and `dev` tasks.                                                                          | Present                                            |
| Backend             | `services/hos-api` is a NestJS TypeScript service.                                                                                                   | Present                                            |
| Frontend            | `apps/staff-portal` is the current Staff Portal candidate; `apps/patient-portal` is also present but contains only package-level test configuration. | One active portal, one reserved/empty app boundary |
| API boundary        | `services/hos-api/src/bootstrap/configure-enterprise-application.ts` applies the `api` prefix and URI versioning; Patient routes use `/api/v1`.      | Present for current slice                          |
| Operational routes  | `services/hos-api/src/health/health.controller.ts` exposes `/health`, `/ready`, `/live`, `/info`, and `/version`.                                    | Present                                            |
| Documentation       | Constitution, ADRs, clinical framework, Patient Blueprint, API standards, knowledge base, and audit documents exist under `docs/`.                   | Present, with some older audit content now stale   |
| CI                  | `.github/workflows/quality-gates.yml` runs install, lint, typecheck, build, and test on pull requests and selected pushes.                           | Present                                            |

The architecture is a modular monolith with explicit domain, application,
infrastructure, composition, and presentation boundaries. The repository does
not contain evidence of independently deployed clinical microservices.

## 3. Bounded Contexts and Enterprise Core

### Implemented or scaffolded contexts

- **Enterprise Core/platform:** request context, configuration, logging, health,
  response/error contracts, security metadata, shared domain kernel, and
  infrastructure adapters.
- **Identity and Access:** identity contracts, permission registry, session and
  token interfaces, password policy interfaces, security decorators, and
  fail-closed authorization behavior. Provider-backed authentication is absent.
- **Patient:** domain, application, infrastructure, composition, persistence
  mapping, and the first protected read API slice.

### Enterprise Core ownership that is not yet implemented

The repository contains contracts or documentation for some shared concepts, but
not complete implementations for staff registry, facilities, departments,
encounters, appointments, enterprise billing, notifications, terminology,
document lifecycle, or durable audit storage. These concepts must not be
recreated inside departmental modules.

## 4. Patient Capability Status

| Capability                        | Status      | Evidence and boundary                                                                                                                                                                                                                             |
| --------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Patient identity model            | **PARTIAL** | `services/hos-api/src/modules/patient/domain` contains the Patient aggregate, identifiers, value objects, rules, specifications, and events. It is identity/administrative-demographics focused.                                                  |
| Patient application orchestration | **PARTIAL** | `services/hos-api/src/modules/patient/application` contains commands, queries, handlers, ports, services, and tests. Full production workflows still require authentication, durable audit, operational policy, and approved workflow acceptance. |
| Patient persistence               | **PARTIAL** | `services/hos-api/src/modules/patient/infrastructure` and the Prisma schema support Patient identity and administrative demographics. No clinical record, encounter, or document persistence exists.                                              |
| Patient API                       | **PARTIAL** | `services/hos-api/src/modules/patient/presentation` exposes protected UUID lookup and bounded search. Registration, update, merge, split, archive, restore, and timeline endpoints are intentionally absent.                                      |
| Patient search                    | **PARTIAL** | Search has typed query and pagination contracts plus indexed identity fields. Full-text, phonetic, biometric, national-identifier, and operational-scale search are not implemented.                                                              |
| Duplicate prevention              | **PARTIAL** | Domain rules and infrastructure duplicate-detection adapters exist. Institutional matching policy, review queues, biometrics, and production operational workflow are not implemented.                                                            |
| Longitudinal record               | **MISSING** | No Encounter, Clinical Record, Orders, Results, Documents, Medication, or Timeline bounded context is implemented.                                                                                                                                |
| Legal record custody              | **MISSING** | Medical Records ownership is documented, but no Medical Records runtime module or durable document lifecycle is present.                                                                                                                          |

## 5. IAM and Security Status

| Capability               | Status          | Evidence                                                                                                                                                                                          |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization metadata   | **PARTIAL**     | Roles, permissions, claims, policies, department metadata, and decorators exist under `services/hos-api/src/security` and `src/modules/identity`.                                                 |
| Fail-closed protection   | **PARTIAL**     | `AuthorizationGuard` is global from `CoreModule` and rejects protected requests when authentication is not configured. This is safe for the current development boundary but blocks clinical use. |
| Authentication           | **PLACEHOLDER** | `AuthenticationGuard` and provider interfaces exist, but no configured provider, login flow, token validation, refresh-token service, or session persistence is present.                          |
| RBAC/PBAC evaluation     | **PLACEHOLDER** | Permission and policy contracts exist; runtime identity and policy evaluation are not complete.                                                                                                   |
| MFA and step-up controls | **PLACEHOLDER** | Configuration and interfaces indicate readiness; no provider-backed MFA or high-consequence step-up workflow exists.                                                                              |
| Secret lifecycle         | **PARTIAL**     | Environment-based JWT and cookie settings exist, but production secret management and mandatory production validation require completion.                                                         |
| Security monitoring      | **PARTIAL**     | Security logging hooks and audit metadata exist; no durable security event store or monitoring integration exists.                                                                                |

## 6. Persistence and Database Status

| Capability                | Status          | Evidence                                                                                                                                                                                                             |
| ------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prisma/PostgreSQL adapter | **PARTIAL**     | `services/hos-api/src/database/providers/prisma-provider.ts` lazily creates `PrismaClient` with `PrismaPg` when `DATABASE_URL` exists and exposes connection health.                                                 |
| Patient schema            | **PARTIAL**     | `services/hos-api/prisma/schema/schema.prisma` contains `Patient` and `PatientIdentifier` only.                                                                                                                      |
| Migration execution       | **PLACEHOLDER** | Prisma scripts and migration status configuration exist; no business migration history was observed in the current scope.                                                                                            |
| Repository contracts      | **PARTIAL**     | Generic repositories, specifications, unit-of-work contracts, and Patient adapters exist. Production transaction and persistence behavior is not validated against a live PostgreSQL environment in this checkpoint. |
| Durable audit persistence | **MISSING**     | `AuditService` currently delegates to `LoggingAuditPublisher`; logs are not a tamper-evident legal audit store.                                                                                                      |
| Backup/restore/DR         | **MISSING**     | No operational backup, restore, recovery, or continuity automation was evidenced in the active deployment structure.                                                                                                 |

## 7. Frontend and Staff Portal Status

`apps/staff-portal` is the only implemented frontend surface. Its evidence
includes the shared shell, sidebar, topbar, breadcrumbs, platform dashboard,
Patient search page, existing `/workspace` route, typed API client, error
fallback, theme tokens, and health integration. The dashboard calls the backend
health endpoint; the Patient search page calls the protected Patient API through
the typed client.

The portal is **PARTIAL** as an enterprise clinical workspace. It has no
authentication/session boundary, no real clinical modules, no Patient detail
workflow, no durable offline/degraded-mode command queue, and no production
accessibility/performance evidence. Navigation entries such as Pharmacy,
Laboratory, Radiology, Billing, and HR are explicit placeholders in
`apps/staff-portal/src/app/router/router.tsx` and are not implemented modules.

## 8. Capability Gap Matrix

The following matrix classifies the target catalogue using the required
combination of UI, application behavior, domain rules, persistence, API,
authorization, audit, validation, failure handling, tests, and operations. A
route, interface, documentation page, or screen alone is not treated as
complete.

| Capability                         | Status          | Owning context                                                | Evidence                                                                                                  | Primary gap                                                                                      | Priority |
| ---------------------------------- | --------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------- |
| Enterprise Core                    | **PARTIAL**     | Enterprise Core                                               | `services/hos-api/src/core`, `config`, `health`, `logging`, `shared`                                      | Staff/facility/department/encounter/reference services are absent                                | P0       |
| Identity & Access                  | **PLACEHOLDER** | Identity & Access                                             | `services/hos-api/src/modules/identity`, `src/security`                                                   | No provider-backed authentication or persisted sessions                                          | P0       |
| Master Patient Index               | **PARTIAL**     | Patient                                                       | `services/hos-api/src/modules/patient`                                                                    | Matching governance, merge review, biometrics, and operational queues absent                     | P0       |
| Encounter                          | **MISSING**     | Encounter                                                     | No `encounter` module under `services/hos-api/src/modules`                                                | Canonical visit/encounter lifecycle absent                                                       | P0       |
| Clinical Record                    | **MISSING**     | Clinical Record / Medical Records                             | No runtime module                                                                                         | Legal document lifecycle, signatures, amendments, and custody absent                             | P1       |
| Orders and Results                 | **MISSING**     | Orders / Diagnostics                                          | No runtime modules                                                                                        | Closed-loop ordering and result acknowledgement absent                                           | P1/P3    |
| Medication and eMAR                | **MISSING**     | Medication / Pharmacy / Nursing                               | No runtime modules                                                                                        | Electronic prescribing, dispensing, administration, and reconciliation absent                    | P3       |
| Nursing and Wards                  | **MISSING**     | Nursing / Inpatient                                           | No runtime modules                                                                                        | Observations, handover, bed/ward workflows absent                                                | P4       |
| Clinical Coordination              | **MISSING**     | Candidate Clinical Coordination context                       | No runtime module or reusable coordination contract                                                       | Responsibility, paging, acknowledgement, escalation, and handover absent                         | P2       |
| Referral and Scheduling            | **MISSING**     | Referral / Scheduling                                         | No runtime modules                                                                                        | Long-running referral and follow-up workflows absent                                             | P3/P7    |
| A&E                                | **MISSING**     | A&E                                                           | No runtime module                                                                                         | Triage, emergency encounters, transfers, and response coordination absent                        | P4       |
| Theatre                            | **MISSING**     | Theatre                                                       | No runtime module                                                                                         | Surgical scheduling and perioperative record absent                                              | P4       |
| ICU/HDU                            | **MISSING**     | ICU/HDU                                                       | No runtime module                                                                                         | Critical-care observations, devices, and escalation absent                                       | P4       |
| Maternity / Paediatrics / Neonatal | **MISSING**     | Maternity / Paediatrics                                       | No runtime modules                                                                                        | Delivery, newborn identity, mother-baby relationship, and neonatal care absent                   | P4/P5    |
| Blood Bank                         | **MISSING**     | Blood Bank                                                    | No runtime module                                                                                         | Compatibility, issue, administration, and traceability absent                                    | P4       |
| Amenity                            | **MISSING**     | Amenity operations                                            | No runtime module                                                                                         | Premium accommodation and operational coordination absent; must consume Enterprise Core identity | P6       |
| Billing / Financial                | **MISSING**     | Billing / Finance                                             | No runtime module; documented target only                                                                 | One enterprise ledger, payment events, claims, and reconciliation absent                         | P6       |
| Quality / Patient Safety           | **MISSING**     | Quality & Patient Safety                                      | No runtime module                                                                                         | Incidents, review, and safety metrics absent                                                     | P6       |
| Infection Prevention               | **MISSING**     | Infection Prevention                                          | No runtime module                                                                                         | Surveillance and stewardship workflows absent                                                    | P6       |
| Teaching / Research                | **MISSING**     | Teaching / Research                                           | Documentation exists; no runtime module                                                                   | Governed education and research data platform absent                                             | P8       |
| Interoperability                   | **PLACEHOLDER** | Interoperability                                              | `docs/20_Integrations`, `docs/27_Enterprise_Clinical_Framework`                                           | No gateway, adapters, message delivery, terminology mapping, or external contracts               | P7       |
| Analytics / KPI / Command Centre   | **MISSING**     | Analytics / Patient Flow                                      | No runtime module or warehouse                                                                            | Operational projections and governed metrics absent                                              | P6/P8    |
| Vital Events & Mortality           | **MISSING**     | Proposed Vital Events context with Medical Records governance | No discharge, death, birth, Last Office, mortuary, or certificate module                                  | No separation of confirmation, certification, approval, issuance, amendment, or audit            | P0/P4    |
| Audit                              | **PARTIAL**     | Audit / Enterprise Core                                       | `services/hos-api/src/audit`, `src/logging`                                                               | Logging-backed publisher is not durable, immutable, or retention governed                        | P0       |
| Platform Operations                | **PARTIAL**     | Platform / Operations                                         | health endpoints, CI workflow, deployment scripts                                                         | No container baseline, metrics, tracing, backup, DR, or production secret integration            | P0       |
| AI / Future Intelligence           | **PLACEHOLDER** | AI governance                                                 | `docs/14_AI`, `docs/23_AI_Engineering`, `docs/27_Enterprise_Clinical_Framework/11_AI_Extension_Points.md` | No governed inference, evaluation, human oversight, or traceability runtime                      | P8       |

### Vital Events target requirements

The additional directive is recorded as a target architecture requirement, not
an implementation. The future context must distinguish death recorded, clinical
confirmation, clinical details, Last Office review, certification, approval,
signature/endorsement, issuance, amendment, and closure. It must consume
canonical Patient and Encounter identities; it must not create another identity,
authentication, audit, or document platform. Births must support a distinct
newborn identity and an explicit mother-baby relationship. Permissions must be
separated for viewing, preparation, correction, certification, approval, issue,
and amendment. Statutory and clinical definitions require approved JUTH policy
before implementation.

## 9. Architecture Gap Map

| Target domain                                     | Current disposition                   | Boundary decision required                                                                                         |
| ------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Enterprise Core                                   | Platform foundation exists            | Define canonical staff, facility, department, encounter, notification, terminology, and reference-data ownership   |
| Identity & Access                                 | Contracts and fail-closed guard exist | Approve provider, session, token, MFA, step-up, and policy-evaluation architecture                                 |
| Patient                                           | First identity read slice exists      | Complete MPI governance before write workflows                                                                     |
| Encounter                                         | Absent                                | Approve canonical encounter ownership and lifecycle before clinical modules                                        |
| Clinical Record                                   | Absent                                | Define Medical Records custody, document lifecycle, provenance, signatures, and amendments                         |
| Orders / Medication / Diagnostics                 | Absent                                | Define shared order/result contracts and closed-loop responsibility                                                |
| Nursing / Inpatient / A&E / Theatre / ICU         | Absent                                | Define care-delivery contexts and coordination dependencies                                                        |
| Maternity / Paediatrics / Neonatal / Vital Events | Absent                                | Approve mother-baby, birth, death, certificate, and jurisdictional policies                                        |
| Clinical Coordination                             | Absent candidate context              | Define responsibility resolution, roster/on-call, communication, paging, acknowledgement, and escalation contracts |
| Referral / Scheduling                             | Absent                                | Define long-running workflow ownership and integration events                                                      |
| Billing / Amenity / Enterprise Operations         | Absent                                | Define one financial ledger and operational-data ownership without departmental duplicates                         |
| Quality / Infection / Teaching / Research         | Absent                                | Define consent, purpose-of-use, and governance boundaries                                                          |
| Interoperability                                  | Documentation only                    | Establish gateway and anti-corruption layer; do not expose operational database                                    |
| Analytics / Command Centre                        | Absent                                | Define event projections, KPI ownership, and data governance                                                       |
| Platform / Audit / AI                             | Partial/placeholder                   | Close durable audit, observability, resilience, AI oversight, and recovery controls                                |

## 10. Architectural Drift and Duplication Findings

| Finding                                     | Evidence                                                                                                                                                                                     | Assessment                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Duplicate persistence contract namespaces   | `services/hos-api/src/database/interfaces` and `src/database/repositories` both expose persistence abstractions; `src/shared/domain/repositories` also exposes a domain repository contract. | **Medium risk.** Consolidation requires an ADR; no automatic refactor performed.                                         |
| Placeholder frontend routes                 | `apps/staff-portal/src/app/router/router.tsx` maps future domains to `Placeholder`.                                                                                                          | **Intentional placeholder**, not a business implementation.                                                              |
| IAM placeholder treated as runtime security | `AuthorizationGuard` fails closed, while `AuthenticationGuard` has no provider.                                                                                                              | **High readiness risk**, not a bypass. Clinical use must remain disabled until authentication is implemented and tested. |
| Audit logging versus durable audit          | `AuditService` delegates to `LoggingAuditPublisher`.                                                                                                                                         | **High compliance risk.** Logs are not a legal audit store.                                                              |
| Archive and generated inventory surface     | `archive/` and root inventory text files exist.                                                                                                                                              | **Medium source-of-truth risk.** Define quarantine and generated-artifact policy before scale.                           |
| Direct cross-domain database access         | No evidence found in the current active modules.                                                                                                                                             | **Not observed** in the inspected source; enforce with architecture fitness tests.                                       |
| Duplicate shells or Patient controllers     | One Staff Portal shell and one Patient controller were found.                                                                                                                                | **Not observed**.                                                                                                        |
| Hard-coded clinical hierarchy               | No clinical module implementation was found.                                                                                                                                                 | **Not observed**, but must be prohibited in future coordination design.                                                  |

No evidence was found of a second Patient database, second authentication
system, billing engine, notification implementation, or independently deployed
clinical service in the active source tree.

## 11. Quality-Gate Checkpoint

| Command                                    | Observed result                                                                                                                                                                      | Interpretation                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`           | Dependency resolution reported lockfile up to date, then emitted `ERR_PNPM_META_FETCH_FAIL` for the pnpm registry metadata request and the chained command stopped before root lint. | **Environment/network failure**, not a lockfile failure. Offline install was subsequently attempted.                          |
| `pnpm install --offline --frozen-lockfile` | Reported all 11 projects and “Already up to date”.                                                                                                                                   | Dependency cache appears sufficient for offline installation; exit confirmation should be repeated in an uncontended session. |
| `pnpm lint`                                | Turbo terminated with Windows exit `3221225501`; direct workspace lint processes then hung without diagnostics after the interrupted run.                                            | **Not green at this checkpoint.** Process/environment issue requires clean rerun.                                             |
| `pnpm typecheck`                           | Not conclusively rerun after the interrupted session.                                                                                                                                | **Not assessed in this checkpoint.**                                                                                          |
| `pnpm build`                               | Not run after this realignment.                                                                                                                                                      | **Not assessed in this checkpoint.**                                                                                          |
| `pnpm test`                                | Not run after this realignment.                                                                                                                                                      | **Not assessed in this checkpoint.**                                                                                          |
| `pnpm --filter hos-api test:e2e`           | Not run after this realignment.                                                                                                                                                      | **Not assessed in this checkpoint.**                                                                                          |
| Architecture fitness tests                 | No dedicated fitness-test suite was found.                                                                                                                                           | **Missing.**                                                                                                                  |
| Migration validation                       | Prisma scripts exist; no live database validation was performed.                                                                                                                     | **Not assessed.**                                                                                                             |
| Dependency/security checks                 | No dedicated automated audit job was found in the active workflow.                                                                                                                   | **Missing.**                                                                                                                  |

The failed/hanging local commands are not being reclassified as source defects
without a clean, serial rerun. No failure was hidden or suppressed.

## 12. Proposed ADRs

These are proposals only and are not approved decisions:

1. Canonical Enterprise Core ownership for Patient, Encounter, Medical Records,
   facilities, departments, staff, documents, notifications, terminology, and
   reference data.
2. Authentication provider, session lifecycle, token rotation, MFA, and
   step-up authentication for high-consequence actions.
3. Durable tamper-evident audit architecture and retention policy.
4. Clinical Coordination bounded-context boundary and responsibility-resolution
   contract.
5. Resilient intranet-first/degraded-mode clinical operation and reconciliation.
6. Clinical terminology and local-to-standard code governance.
7. Vital Events, mortality, births, Last Office, certificate lifecycle, and
   mother-baby identity policy.
8. Interoperability gateway, versioned contracts, and anti-corruption layers.
9. Database abstraction namespace consolidation and architecture fitness rules.
10. Analytics/KPI projection and command-centre data governance.

## 13. Proposed Architecture Fitness Tests

The next platform test suite should fail when:

- a controller imports Prisma or persistence models;
- a domain package imports NestJS, Express, Prisma, or infrastructure code;
- a module imports another module's private implementation path;
- a clinical module creates or owns a second Patient identity;
- a clinical module writes directly to another context's database tables;
- an API exposes persistence entities rather than presentation projections;
- protected routes lack authorization metadata;
- audit-sensitive commands have no audit port or event contract;
- domain code calls system time directly instead of the Clock abstraction;
- an event contract is changed without an API/ADR compatibility record.

## 14. Dependency Map

```text
Staff Portal
  -> typed API client
  -> versioned presentation API
  -> application services and query handlers
  -> Patient domain
  -> repository ports
  -> Prisma/PostgreSQL infrastructure

Operational health endpoints
  -> HealthService
  -> DatabaseService
  -> PrismaProvider health boundary

Cross-cutting request path
  -> request/correlation context
  -> validation pipe
  -> authorization guard
  -> controller/interceptors
  -> application boundary
```

The target dependency map for future clinical modules remains:

```text
Clinical specialty
  -> Enterprise Patient identity and Encounter references
  -> Clinical Record / Medical Records contracts
  -> Orders, Coordination, Billing, Notifications, and Audit contracts
  -> specialty domain and application behavior
  -> approved infrastructure adapters
```

No future module should depend directly on another context's persistence.

## 15. Revised P0-P8 Backlog

| Priority | Scope                                                                                                                                                                 | Exit condition                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| P0       | Close authentication, authorization evaluation, durable audit, MPI governance, canonical Encounter design, provenance, terminology, observability, and fitness tests. | Protected clinical operation has real identity, policy, audit, and traceability.       |
| P1       | Establish Clinical Record, Medical Records document lifecycle, problems, allergies, observations, and order/result foundations.                                       | Longitudinal record has governed provenance and legal lifecycle.                       |
| P2       | Implement Clinical Coordination design and first responsibility/acknowledgement slice.                                                                                | Clinically significant work has attributable ownership and escalation semantics.       |
| P3       | Implement closed-loop prescribing, pharmacy, eMAR, diagnostics, referrals, and critical-result workflows.                                                             | Orders, results, medication, and acknowledgement are traceable end to end.             |
| P4       | Implement A&E, wards, theatre, ICU/HDU, blood bank, and Vital Events/mortality slices after approved blueprints.                                                      | Acute and high-consequence workflows have explicit safety states and audit.            |
| P5       | Implement specialty contexts such as Eye Clinic, maternity, neonatal, paediatrics, dental, ENT, and others.                                                           | Each specialty has its own approved blueprint and inherits enterprise governance.      |
| P6       | Implement Amenity, patient flow, command centre, billing/insurance, capacity, quality, and management analytics.                                                      | Enterprise operations use canonical identity, ledger, and event projections.           |
| P7       | Implement external referral, patient portal, interoperability gateway, and standards-based HIE.                                                                       | External exchange is versioned, authorized, and isolated from operational persistence. |
| P8       | Implement teaching, research, advanced analytics, and governed AI assistance.                                                                                         | AI remains advisory, traceable, evaluated, and clinically accountable.                 |

## 16. Safest Next Implementation Slice

**No implementation is authorized by this checkpoint.** After review and an
approved branch is created, the safest next slice is a platform-only
**authentication and authorization provider contract/fitness-test slice** or,
if the architecture team decides authentication requires an external identity
provider first, a **durable audit contract and persistence design slice**.

The next slice must not be Clinical Coordination or Vital Events code. Both
depend on canonical identity, Encounter, responsibility, authorization, audit,
and document policies that are not yet implemented or approved.

Potentially affected areas after approval:

- `services/hos-api/src/modules/identity/`
- `services/hos-api/src/security/`
- `services/hos-api/src/core/`
- `services/hos-api/src/audit/`
- platform tests and CI quality gates
- a new ADR and updated architecture compliance record

## 17. Risks and Acceptance Criteria

### Principal risks

- Clinical work could begin while authentication remains a placeholder.
- Logging could be mistaken for a legally sufficient audit record.
- Patient identity could be duplicated by future clinical or administrative
  contexts without a canonical Enterprise Core contract.
- Vital Events could incorrectly conflate discharge, death confirmation,
  certification, approval, and issuance.
- Long-running clinical responsibility could disappear without acknowledgement
  or escalation.
- Offline/degraded operation could introduce uncontrolled local state or
  reconciliation conflicts.
- Stale audit documents could overstate current readiness.

### Checkpoint acceptance criteria

This checkpoint is complete when the architecture team confirms:

- the clean `main` state and HEAD are preserved;
- no realignment implementation was performed;
- the capability matrix and Vital Events target domain are reviewed;
- proposed ADRs and fitness tests are accepted, rejected, or revised;
- a feature/sprint branch is selected before code changes;
- the next slice has explicit acceptance tests and an approved owner.

## 18. Final Statement

The repository is a credible platform and Patient identity foundation, not a
deployable teaching-hospital operating system. The correct architectural move
at this point is to preserve the modular monolith and close P0 identity,
authorization, audit, encounter, provenance, terminology, observability, and
fitness-test gaps before implementing the target clinical capability catalogue.

**NO IMPLEMENTATION PERFORMED AFTER REALIGNMENT CHECKPOINT.**

## 19. Visual Development and Browser Preview

This section records how the existing applications can be run for continuous
visual review. It does not authorize a new frontend or application shell.

### Verified applications and commands

| Item                         | Evidence-derived value                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| Staff Portal                 | `apps/staff-portal`                                                                          |
| Frontend framework           | React, TypeScript, Vite, React Router                                                        |
| Frontend development command | `pnpm --filter staff-portal dev`                                                             |
| Frontend port                | `5173` (Vite default; no alternate port is configured in `apps/staff-portal/vite.config.ts`) |
| API application              | `services/hos-api`                                                                           |
| API framework                | NestJS, TypeScript                                                                           |
| API development command      | `pnpm --filter hos-api start:dev`                                                            |
| API port                     | `3000` by default from `services/hos-api/src/config/environment.validation.ts`               |
| Business API prefix          | `/api/v1`, applied by `configureEnterpriseApplication` and URI versioning                    |
| Operational endpoints        | Root-level `/health`, `/ready`, `/live`, `/info`, `/version`                                 |
| Swagger/OpenAPI              | `http://localhost:3000/docs` when `SWAGGER_ENABLED` is true; development defaults enable it  |
| Frontend URL                 | `http://localhost:5173/`                                                                     |

### Connectivity and configuration

`apps/staff-portal/.env.development` contains:

```text
VITE_API_BASE_URL=http://localhost:3000
```

The typed client in `apps/staff-portal/src/app/api/api-client.ts` uses this
value and has a localhost fallback. The current dashboard health integration
calls `/health` through that client. Patient search calls the approved
versioned Patient API through the same client.

No Vite proxy is configured in `apps/staff-portal/vite.config.ts`; direct
browser-to-API communication is expected. The backend enables CORS in
`services/hos-api/src/main.ts` using typed configuration. With no explicit
`CORS_ORIGINS`, the current development configuration permits the browser
origin; production must provide an explicit allow-list. Credentials are enabled
by the current default and must remain governed by production security policy.

Backend environment variables are optional for the default local startup. The
validated configuration supplies development defaults including `NODE_ENV`,
`PORT`, rate limiting, Helmet, Swagger, and other platform settings. A
`DATABASE_URL` is required only to activate a PostgreSQL connection; without it,
the database health state is `not_configured`. No secret belongs in the Vite
environment file.

### Test/demo authentication

No test or demo authentication mechanism is configured for browser use. The
repository contains authentication interfaces and a fail-closed authorization
guard, but no provider-backed login/session implementation. Protected Patient
routes therefore return an authorization error until an approved authenticated
context exists. This is an intentional safety boundary and must not be replaced
with fake production authentication.

### Browser-loadable routes

The current Staff Portal router in
`apps/staff-portal/src/app/router/router.tsx` provides:

| Route             | Current behavior                                      |
| ----------------- | ----------------------------------------------------- |
| `/`               | Platform Dashboard with backend health status         |
| `/workspace`      | Existing Enterprise Patient Workspace shell           |
| `/patients`       | Patient identity search surface; protected API access |
| `/clinics`        | Explicit placeholder extension point                  |
| `/pharmacy`       | Explicit placeholder extension point                  |
| `/laboratory`     | Explicit placeholder extension point                  |
| `/radiology`      | Explicit placeholder extension point                  |
| `/billing`        | Explicit placeholder extension point                  |
| `/inventory`      | Explicit placeholder extension point                  |
| `/hr`             | Explicit placeholder extension point                  |
| `/reports`        | Explicit placeholder extension point                  |
| `/administration` | Explicit placeholder extension point                  |
| `/settings`       | Explicit placeholder extension point                  |

The Patient Workspace route is `/workspace`. It is inherited by the existing
`MainLayout`; no second shell was introduced.

### Live preview evidence and blockers

The previous live verification established the following behavior for the
current committed baseline:

- `http://localhost:3000/health`, `/ready`, `/live`, `/version`, `/info`, and
  `/docs` responded successfully.
- The Staff Portal dashboard loaded and displayed Connected/Online status,
  API version `1.0.0`, Development environment, health status, and the
  configured database state.
- `/workspace` loaded without a duplicate shell.
- `/patients` loaded its search UI. A search request returned the expected
  fail-closed `403 AUTHORIZATION_ERROR` because no authentication provider is
  configured.
- No browser console errors or unexpected runtime exceptions were observed in
  the normal dashboard and workspace flows.

Current preview blockers are authorization provider availability for protected
Patient data, absence of real Patient records in a configured development
database, and the unresolved local Turbo/lint/e2e process behavior recorded in
the quality-gate section. These blockers do not justify fake data or a security
bypass.

### Recommended continuous review procedure

Use two terminals:

```powershell
pnpm --filter hos-api start:dev
pnpm --filter staff-portal dev
```

Then review the Staff Portal at `http://localhost:5173/`, the health endpoint at
`http://localhost:3000/health`, and Swagger at `http://localhost:3000/docs`.
Each approved implementation slice should repeat this flow and record the
actual browser route, network behavior, console state, and API response.

## 20. Programme Control Centre Assessment

The proposed **JUTH HOS Programme Control Centre** is a development-only
programme visibility capability. It is not a clinical module, patient workflow,
or production application shell. It has not been implemented.

### Recommended boundary

The Control Centre should consume read-only, evidence-derived repository and
quality-gate data. It must not import Patient domain classes, access Prisma,
write clinical data, alter clinical routes, or become a second authorization,
audit, or configuration system. Its deployment and navigation should be
development-only and excluded from the clinical production build.

Before implementation, approve whether this should be a separately packaged
development application or a development-only workspace inside the existing
Staff Portal. The decision must avoid a competing clinical shell and should be
recorded in an ADR if it changes the repository application model.

### Evidence model

The Control Centre should show explicit status evidence for:

- current sprint and implementation slice;
- repository, branch, commit, and worktree state;
- lint, typecheck, unit test, integration test, e2e, and build results;
- Architecture Fitness Test results;
- capability and bounded-context status;
- backend/API and Staff Portal status;
- database connection and migration status;
- IAM, security, and audit status;
- ADR and Constitution status;
- risks, blockers, workflow discovery, UAT, and deployment readiness;
- the approved recommended next slice.

It must display status as `COMPLETE`, `PARTIAL`, `PLACEHOLDER`, `MISSING`,
`BROKEN`, or `NOT_YET_ASSESSED` with evidence links and timestamps. It must
not infer arbitrary completion percentages from screen count, line count, or
route count.

For an implementation slice, progress may be represented as a criteria matrix:

| Criterion             | Allowed state                     | Evidence required                                |
| --------------------- | --------------------------------- | ------------------------------------------------ |
| DOMAIN                | not assessed / partial / complete | approved blueprint, domain tests, review         |
| DATABASE              | not assessed / partial / complete | schema/migration evidence and validation         |
| API                   | not assessed / partial / complete | versioned contract, controller/application tests |
| AUTHORIZATION         | not assessed / partial / complete | policy, guard, negative tests                    |
| AUDIT                 | not assessed / partial / complete | audit contract, persistence, trace evidence      |
| UI                    | not assessed / partial / complete | route, states, accessibility review              |
| VALIDATION            | not assessed / partial / complete | DTO/input validation and tests                   |
| ERROR HANDLING        | not assessed / partial / complete | safe error contract and failure tests            |
| TESTS                 | not assessed / partial / complete | unit/integration/e2e results                     |
| WORKFLOW VALIDATION   | not assessed / partial / complete | clinical workflow/UAT evidence                   |
| OPERATIONAL READINESS | not assessed / partial / complete | health, monitoring, rollback, runbook            |

Slice status should be calculated only from an approved rule over these
criteria, or displayed as a non-numeric evidence list until such a rule is
approved.

### Workflow Discovery Register proposal

The register should be a governed programme artifact populated from an approved
JUTH master list of clinics, units, wards, and departments. This audit does not
invent or pre-populate institutional units not evidenced in the repository.

| Field              | Required meaning                                                      |
| ------------------ | --------------------------------------------------------------------- |
| Register ID        | Stable identifier for the discovery record                            |
| Facility           | JUTH facility or approved deployment scope                            |
| Unit/Department    | Clinic, unit, ward, or department name from the approved master list  |
| Workflow owner     | Accountable clinical/operational owner                                |
| Product owner      | Programme owner for the discovery record                              |
| Current status     | One governed status from the list below                               |
| Evidence           | Interview notes, process maps, documents, observations, and approvals |
| Pain points        | Validated current-state problems and clinical impact                  |
| Future workflow    | Approved target-state design reference                                |
| Clinical validator | Named validating authority and date                                   |
| Specification      | Blueprint/requirements reference when ready                           |
| UAT evidence       | Scenario results, defects, sign-off, and date                         |
| Risks/blockers     | Open issues and escalation owner                                      |
| Last reviewed      | Timestamp and reviewer                                                |

The allowed statuses are:

```text
NOT_STARTED
INTERVIEW_SCHEDULED
DISCOVERY_IN_PROGRESS
CURRENT_WORKFLOW_CAPTURED
PAIN_POINTS_VALIDATED
FUTURE_WORKFLOW_DESIGNED
CLINICALLY_VALIDATED
SPECIFICATION_READY
DEVELOPMENT
UAT
READY_FOR_DEPLOYMENT
```

Status transitions must be evidence-backed and must not be advanced because a
screen or placeholder route exists. The register should support filters by
facility, unit, owner, status, risk, and target sprint, but it must not become
the source of truth for clinical patient data.

### Recommendation

Do not implement the Programme Control Centre in this audit cycle. First approve
its boundary, evidence schema, access control, environment isolation, and
workflow-register ownership. After approval, implement it as a read-only
programme tool with its own tests and documentation, outside the clinical
bounded-context dependency graph.
