# Architecture Compliance Matrix

## Scope

This matrix compares the repository baseline against the JUTH Enterprise Architecture and Development Constitution and approved ADRs.

| Constitution Section | Repository Evidence | Compliance Status | Remaining Work | Owner | Target Sprint |
| --- | --- | --- | --- | --- | --- |
| Volume 00: Vision, Mission and Governance | Constitution exists under `docs/00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/`; governance files exist at repository root. | Compliant | Keep ledger and release baselines current. | Chief Software Architect | Ongoing |
| Volume 01: Enterprise Platform Architecture | `pnpm-workspace.yaml`, `turbo.json`, `apps/`, `services/`, `packages/`, `docs/`, `deployment/`, `archive/`. | Compliant | Continue enforcing package boundaries. | Platform Engineering | Ongoing |
| Volume 02: Backend Architecture | `services/hos-api` uses NestJS, modules, guards, interceptors, filters, config, logging, health, and database foundation. | Partially compliant | Add runtime IAM, real database adapter, and platform tests in approved sprints. | Backend Platform | Sprint 006B+ |
| Volume 03: Frontend Architecture | `apps/staff-portal` uses React, TypeScript, shared shell, and builds through root gates. | Partially compliant | Add accessibility and component tests without redesign. | Frontend Platform | Sprint 006B+ |
| Volume 04: Clinical Domain Architecture | Domain blueprint framework exists in `docs/02_Domain_Blueprints/`. | Compliant for governance | Future clinical domains require approved blueprints. | Domain Architecture | Per module |
| Volume 05: Enterprise Patient Workspace | Constitution defines workspace extension model. Existing app remains unchanged. | Governance compliant | Future changes require approved sprint scope. | Frontend Platform | Per module |
| Volume 06: Security and IAM | `SECURITY.md`, IAM foundation code, and security Constitution volume exist. | Partially compliant | Implement runtime authentication and authorization providers in approved sprint. | Security Architecture | IAM sprint |
| Volume 07: Integration Standards | Integration standards volume and ADR-008/ADR-009 exist. | Compliant for governance | Implement adapters only when approved. | Integration Architecture | Future |
| Volume 08: Development Standards | Root gates: install, lint, typecheck, build, test, clean, format. CI workflow exists. | Compliant | Add richer test coverage. | Platform Engineering | Sprint 006B |
| Volume 09: DevOps and Operations | `.github/workflows/quality-gates.yml`, `scripts/clean.ps1`, deployment docs. | Partially compliant | Deployment-specific automation deferred pending environment decisions. | DevOps | Future |
| Volume 10: Team Governance | `CONTRIBUTING.md`, PR template, issue templates, CODEOWNERS. | Partially compliant | Replace reserved foundation CODEOWNERS with actual GitHub teams. | Project Owner | Sprint 006B |
| Volume 11: AI Engineering Governance | Constitution volume and `ARCHITECT_INSTRUCTIONS.md`. | Compliant | Continue prompt/change governance. | Chief Software Architect | Ongoing |
| Volume 12: ADRs | `docs/01_Architecture/ADR/ADR-001.md` through `ADR-010.md`. | Compliant | Add ADRs for future architecture changes. | Chief Software Architect | Ongoing |
| Volume 13: Enterprise Roadmap | Release baseline and roadmap volume exist. | Compliant | Keep release baseline updated. | Project Governance | Ongoing |

