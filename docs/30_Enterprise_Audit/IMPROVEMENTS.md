# Sprint 006A Improvement Backlog

## Recommended Improvements

| Priority | Improvement | Rationale | Constraints |
| --- | --- | --- | --- |
| P0 | Add platform unit tests for request context, response wrapping, exception handling, and configuration validation. | These are cross-cutting foundations future modules will depend on. | Do not add business tests in platform sprint. |
| P1 | Add package-level tests for `packages/api`, `packages/types`, and `packages/ui` once behavior expands. | Shared packages now compile independently but do not have behavior coverage. | Keep tests platform-focused. |
| P1 | Decide TypeScript and ESLint version alignment policy. | Version variance is manageable but should be intentional. | Use ADR or engineering governance, not ad hoc upgrades. |
| P1 | Replace CODEOWNERS reserved foundation with actual repository teams. | Pull request governance requires real owners. | Requires project owner or repository admin input. |
| P2 | Add dependency audit automation after baseline gates stabilize. | Deprecated transitives and unused dependencies should be tracked continuously. | Avoid broad dependency churn during hardening. |
| P2 | Populate remaining Constitution volumes and ADRs. | Governance structure exists but not all content is approved. | Continue AG-001 milestones. |

