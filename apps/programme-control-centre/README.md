# JUTH HOS Programme Control Centre

The Programme Control Centre is a development-only governance application for reviewing evidence about the JUTH HOS programme. It is not a clinical module, does not expose patient information, and has no connection to the API, database, Prisma, authentication, or production routes.

## Local Start

From the repository root:

```text
pnpm --filter programme-control-centre dev
```

Open [http://localhost:4173](http://localhost:4173). Port `4173` is reserved for this development application so that it does not collide with the Staff Portal (`5173`) or HOS API (`3000`).

## Architecture Boundary

The application is a standalone Vite/React workspace under `apps/`. It consumes only the typed, version-controlled metadata in `src/data/programme-status.ts`. It must remain removable or independently deployable without changing clinical bounded contexts, the Staff Portal, or `services/hos-api`.

## Evidence Model

The dashboard uses explicit classifications rather than arbitrary completion percentages:

- Capability status: `COMPLETE`, `PARTIAL`, `PLACEHOLDER`, `MISSING`, `BROKEN`, `NOT_ASSESSED`.
- Capability evidence: `VERIFIED`, `PARTIAL`, `MISSING`, `NOT_APPLICABLE`, `NOT_ASSESSED`, `BROKEN`.
- Workflow discovery: the controlled lifecycle from `NOT_STARTED` through `READY_FOR_DEPLOYMENT`.

Capability readiness is represented across the eleven evidence criteria in the data model. A user interface is never sufficient evidence by itself. Workflow discovery status is independent from software delivery status.

## Updating Metadata

Update `src/data/programme-status.ts` only from repository-controlled evidence. Add the evidence path or document reference alongside each status change. Do not add patient data, clinical notes, production identifiers, arbitrary percentages, or inferred clinical validation. New departments and target capabilities may be added as catalogue records without creating runtime clinical modules.

The follow-up implementation report is [18_Programme_Control_Centre_Implementation.md](../../docs/30_Enterprise_Audit/18_Programme_Control_Centre_Implementation.md). The preserved source checkpoint is [17_Architecture_Realignment_Checkpoint.md](../../docs/30_Enterprise_Audit/17_Architecture_Realignment_Checkpoint.md).

## Quality Commands

```text
pnpm --filter programme-control-centre lint
pnpm --filter programme-control-centre typecheck
pnpm --filter programme-control-centre test
pnpm --filter programme-control-centre build
```
