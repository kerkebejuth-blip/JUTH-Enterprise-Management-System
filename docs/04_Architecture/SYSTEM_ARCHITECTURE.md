# System Architecture

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document describes the high-level system architecture for JUTH HOS and ties implementation work to the Constitution and ADR baseline.

## Architecture Model

JUTH HOS uses:

- Monorepo architecture.
- Turborepo task orchestration.
- PNPM workspaces.
- React frontend applications.
- NestJS backend services.
- Shared packages.
- Modular monolith initial deployment.
- Clean Architecture.
- Domain-Driven Design.
- REST-first APIs.
- Event-driven readiness.
- Healthcare standards readiness.

## Repository Layers

| Directory | Responsibility |
| --- | --- |
| `apps/` | User-facing applications, including staff and patient-facing portals. |
| `services/` | Backend services and service-side platform infrastructure. |
| `packages/` | Shared libraries, UI primitives, API clients, types, and utilities. |
| `docs/` | Architecture, governance, audit, domain, and operational documentation. |
| `deployment/` | Deployment and operational automation assets. |
| `archive/` | Historical material not used as active runtime source. |

## Runtime Architecture

The current runtime architecture is a modular platform foundation:

- Staff Portal frontend.
- HOS API backend service.
- Shared TypeScript packages.
- Enterprise governance and CI quality gates.

No clinical or business module may be added without approved sprint scope and a Domain Blueprint.

## Backend Architecture

Backend services use NestJS with modules, controllers, services, providers, DTOs, guards, interceptors, filters, pipes, logging, health, configuration, security, audit, and database foundations.

Domain logic shall remain independent from framework and persistence concerns.

## Frontend Architecture

Frontend applications use React and TypeScript. The Staff Portal is the enterprise clinical workspace, and specialty modules extend shared workspace capabilities through approved extension points.

## Data Architecture

The data architecture is relational, auditable, transaction-aware, and future-ready for multi-facility operation. Domain-owned persistence rules shall be defined in Domain Blueprints.

## Integration Architecture

Integration shall use REST and OpenAPI first, with readiness for FHIR, HL7, DICOM, and event-driven communication.

## Security Architecture

Security is a platform capability with IAM, roles, permissions, claims, sessions, audit logging, data protection, and fail-closed principles.

## Quality Architecture

Root quality gates are:

- `pnpm install`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test`

CI shall run the same gates for pull request validation.

## Governance

The Constitution is authoritative. ADRs govern architecture changes. Domain Blueprints govern future bounded-context implementation.

