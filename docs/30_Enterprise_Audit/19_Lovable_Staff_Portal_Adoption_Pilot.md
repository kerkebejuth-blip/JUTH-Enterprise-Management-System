# JUTH HOS Lovable Adoption — Pilot 01 (2026-10-21)

Source: user-supplied `juth-hos-handoff-2026-10-21.zip` (172 entries), especially `src/lib/hos/clinic-hierarchy.ts`, `src/components/hos/ClinicSubclinicWorkspace.tsx`, and `docs/clinic-hierarchy-adoption.md`.

## Implemented on this isolated branch
- Replaces the existing `/clinics` placeholder with a **read-only** React Router/Vite page.
- Parent clinic selection and URL-backed subclinic selection.
- Fetches proposed `GET /api/v1/clinic-directory` using same-origin authenticated cookies. **This endpoint is not verified to exist.**
- Selects only effective, active and clinically approved entries. Unknown children never show a queue.
- No synthetic patients, client-side consultation authorization, simulated approvals, browser-persisted audits or financial actions.
- SCBU is deliberately not listed as an outpatient clinic: it belongs to Inpatient & Ward Management.

## Outstanding work — do not claim production readiness
1. Verify local worktrees and choose approved integration baseline before any merge.
2. Reconcile frontend API base URL with actual Staff Portal API client. The current same-origin fetch needs an API proxy or change to the existing configured client; it intentionally fails closed without backend.
3. Define and implement a real NestJS directory endpoint, canonical clinic/location/room/team registry, institutional approval, and session overlap constraints.
4. Implement server RBAC/ABAC for clinic scope, assigned team, clinical approvals and queue transitions; never trust the UI filter.
5. Handle deactivation of already booked/queued patients, audit before/after values with server time, notifications and event outbox.
6. Port selected Records, Triage, Queue and Consultation components after mapping existing Staff Portal equivalents. Do not copy TanStack Start routes into React Router.
7. Run pnpm lint, typecheck, build, tests, and browser walkthrough in a clean worktree. No CI/test result is claimed for this branch.
8. Arrange an isolated preview deployment after successful checks; the Lovable URL is NOT the integrated Staff Portal preview.

## Review gates
- No direct main branch changes.
- No production database or payment operations.
- No patient data in public queue.
- No real consultation/queue actions until server authorization and transactional persistence are proven.
