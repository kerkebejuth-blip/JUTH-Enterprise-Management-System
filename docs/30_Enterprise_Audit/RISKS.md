# Sprint 006A Risk Register

## Scope

This register captures risks identified during repository hardening. It is evidence-based and does not modify architecture.

| ID | Severity | Risk | Evidence | Mitigation |
| --- | --- | --- | --- | --- |
| R-006A-001 | High | Future feature work could proceed before platform test coverage exists. | Current test runners intentionally pass when no tests are present. | Require platform tests before business modules depend on shared infrastructure. |
| R-006A-002 | High | Reserved packages may be mistaken for implemented platform capabilities. | Several workspaces expose only package metadata and README documentation. | Keep README ownership explicit and review package readiness during sprint planning. |
| R-006A-003 | Medium | Toolchain version drift can create inconsistent compiler behavior. | TypeScript versions differ across root, staff portal, and API service. | Establish a version-alignment ADR or toolchain policy. |
| R-006A-004 | Medium | CI CODEOWNERS needs real repository principals. | `.github/CODEOWNERS` uses a temporary governance owner until actual teams are assigned. | Replace with actual GitHub users or teams once repository ownership is finalized. |
| R-006A-005 | Medium | Deprecated transitive dependencies remain in the install tree. | `pnpm install` reports deprecated `glob` and `inflight` transitive dependencies. | Monitor dependency updates and remove direct dependencies only when safe. |
| R-006A-006 | Low | Documentation reserved foundations can be confused with approved content. | Several Constitution volumes and ADRs are marked awaiting approval. | Continue AG-001 content milestones and keep status labels visible. |

