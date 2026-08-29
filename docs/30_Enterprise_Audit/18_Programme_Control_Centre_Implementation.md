# JUTH HOS Programme Control Centre Implementation

**Status:** Development-only implementation checkpoint  
**Branch:** `feature/programme-control-centre`  
**Scope:** Programme visibility foundation only  
**PHI:** None

## Purpose

This follow-up report records the first implementation slice approved after the Architecture Realignment Checkpoint. The Programme Control Centre is an isolated governance application for reviewing repository-controlled evidence. It is not part of the Staff Portal, clinical navigation, patient identity, or any production bounded context.

## Architecture Placement

The application lives at `apps/programme-control-centre` as a standalone Vite/React workspace. It reads the typed metadata in `src/data/programme-status.ts` and performs no API, database, Prisma, authentication, or production-route access. It can be removed or deployed independently without changing `apps/staff-portal` or `services/hos-api`.

## Local Access

Start it from the repository root:

```text
pnpm --filter programme-control-centre dev
```

Verified development URL: [http://localhost:4173](http://localhost:4173)

The existing Staff Portal remains at [http://localhost:5173](http://localhost:5173), and the HOS API Swagger UI remains at [http://localhost:3000/docs](http://localhost:3000/docs).

## Implemented Screens

- **Programme Overview:** current slice, checkpoint, evidence status, blockers, and recommended next slice.
- **Capability Matrix:** searchable and filterable catalogue across Enterprise / Platform, Clinical, and Enterprise Operations.
- **Capability Detail:** explicit evidence criteria, evidence paths, gaps, dependencies, ADR references, and tests.
- **Workflow Discovery:** conservative department/unit register with service-type and discovery-status filters.
- **Risks and Decisions:** evidence-linked governance risks and decisions required.

## Data and Status Rules

The catalogue includes the approved enterprise/platform, clinical, and enterprise-operations target capabilities. Missing capabilities are catalogue entries only; no runtime modules were created. The workflow register includes the initial department/unit list required by the approved slice, and all entries begin at `NOT_STARTED` because no new clinical discovery evidence was established by this implementation.

Capability status is separate from the eleven evidence dimensions: `DOMAIN`, `DATABASE`, `API`, `AUTHORIZATION`, `AUDIT`, `UI`, `VALIDATION`, `ERROR_HANDLING`, `TESTS`, `WORKFLOW_VALIDATION`, and `OPERATIONAL_READINESS`. No arbitrary completion percentage is displayed or calculated.

## Preservation and Impact

- The Architecture Realignment Checkpoint remains preserved as the prior audit record.
- No backend, API, Prisma, database, Patient, or Staff Portal source was modified.
- No authentication or clinical workflow was introduced.
- The lockfile changed only to register the new workspace dependencies.

## Validation Record

- `pnpm install --offline --frozen-lockfile`: passed; all 12 workspace projects were already up to date.
- `pnpm --filter programme-control-centre lint`: passed.
- `pnpm --filter programme-control-centre typecheck`: passed.
- `pnpm --filter programme-control-centre test`: passed; 7 tests.
- `pnpm --filter programme-control-centre build`: passed; Vite production bundle generated.
- `pnpm lint`: failed before task diagnostics with the pre-existing Windows Turbo exit `3221225501`.
- `pnpm typecheck`: failed before task diagnostics with the pre-existing Windows Turbo exit `3221225501`.
- `pnpm build`: failed before task diagnostics with the pre-existing Windows Turbo exit `3221225501`.
- `pnpm test`: failed through the root Turbo runner without task diagnostics; the isolated Control Centre test suite passes.
- `git diff --check`: passed with Git's normal LF-to-CRLF warning for `pnpm-lock.yaml`.

The root Turbo failures match the quality-gate limitation recorded in `17_Architecture_Realignment_Checkpoint.md`; no source error was reported for the new workspace.

## Live Verification

- Development command: `pnpm --filter programme-control-centre dev`.
- Verified URL: [http://localhost:4173](http://localhost:4173).
- Chrome verification confirmed page load, Programme Overview, Capability Matrix, capability search for `Patient / MPI`, Workflow Discovery, and Risks and Decisions.
- Responsive verification at 390px viewport reported no horizontal overflow beyond the viewport.
- Browser console errors: none observed.
- Failed network requests: none observed.
- Existing Staff Portal: [http://localhost:5173](http://localhost:5173) returned HTTP 200 with no browser console errors during the check.
- Existing API health endpoints `/health`, `/ready`, `/live`, `/version`, and `/info` returned HTTP 200.
- Existing Swagger endpoint [http://localhost:3000/docs](http://localhost:3000/docs) returned HTTP 200 with the Swagger UI HTML document.

## Remaining Limitations

- Metadata is manually maintained and repository-controlled; automated evidence ingestion is intentionally deferred.
- Root Turbo/process-environment quality gates require a clean rerun where noted in the prior checkpoint.
- Authentication, durable audit persistence, and clinical bounded contexts remain outside this slice.
