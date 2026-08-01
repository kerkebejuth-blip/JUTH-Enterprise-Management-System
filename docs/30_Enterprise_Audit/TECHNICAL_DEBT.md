# Sprint 006A Technical Debt Register

## Scope

This register documents repository hardening debt found during Sprint 006A. It does not authorize feature work or architecture redesign.

## Items

| Severity | Area | Evidence | Debt | Required Action |
| --- | --- | --- | --- | --- |
| High | Testing | `services/hos-api/package.json` uses `jest --passWithNoTests`; `apps/staff-portal/package.json` uses `vitest run --passWithNoTests`. | Quality gates are stable, but real unit/component coverage is not yet present. | Add non-business platform tests in a future testing sprint. |
| High | IAM runtime | `services/hos-api/src/security/authentication.guard.ts` remains foundational only. | Authentication implementation is not complete. | Implement only in approved IAM sprint. |
| Medium | ADR maturity | `docs/01_Architecture/ADR/ADR-001.md` through `ADR-010.md` remain reserved foundations. | ADR structure exists, but decision content is not fully authored. | Populate ADRs through approved architecture governance. |
| Medium | Constitution maturity | Volumes 04, 07, 09, 10, 11, 12, and 13 remain awaiting approval. | Constitution coverage is partial. | Continue AG-001 authoring milestones. |
| Medium | Dependency consistency | Root, staff portal, and API service use different TypeScript major versions. | Toolchain versions are compatible today but should be governed intentionally. | Decide version alignment policy through engineering governance. |
| Medium | Placeholder workspaces | `packages/auth`, `packages/config`, `packages/hooks`, `packages/utils`, and `apps/patient-portal` contain no source. | Reserved packages participate in tests but have no build/typecheck responsibilities yet. | Keep documented or remove when architecture confirms ownership. |
| Low | Shared package tests | `packages/api`, `packages/types`, and `packages/ui` have typecheck/build but no test files. | Shared packages are compile-gated but not behavior-tested. | Add package tests when behavior expands. |

