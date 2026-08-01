# Backend Architecture

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines the backend architecture reference for JUTH HOS implementation.

## Architectural Style

The backend uses:

- NestJS.
- TypeScript.
- Clean Architecture.
- Domain-Driven Design.
- Modular monolith initial deployment.
- Microservice-ready module boundaries.
- REST-first API design.
- Event-driven readiness.
- CQRS readiness.

## Clean Architecture

Backend dependencies shall point inward:

1. Presentation layer.
2. Application layer.
3. Domain layer.
4. Infrastructure layer.
5. Persistence and integration adapters.

Presentation and infrastructure may depend on application and domain contracts. Domain logic must not depend on NestJS, Prisma, HTTP, database schemas, or UI concerns.

## Domain-Driven Design

Each business module shall be implemented as a bounded context with:

- Ubiquitous language.
- Aggregates.
- Entities.
- Value Objects.
- Domain Services.
- Domain Events.
- Repository contracts.
- Application Services.

No bounded context may be implemented without a Domain Blueprint.

## Modular Monolith

The system initially deploys as a modular monolith. Modules shall communicate through explicit interfaces and application-level contracts rather than direct internal coupling.

Future extraction to microservices requires ADR approval.

## Module Boundaries

Each module owns its domain language, application services, DTOs, guards, policies, repository contracts, and integration events.

Modules shall not reach into another module's internal folders. Shared behavior belongs in platform modules or shared packages.

## CQRS Readiness

The default implementation remains simple. CQRS may be introduced when read and write models diverge or workflows require separate optimization.

CQRS adoption requires review and should not be introduced for CRUD convenience.

## Event-Driven Design

Domain events shall represent meaningful business state changes. Integration events shall be versioned contracts suitable for external or asynchronous consumers.

Events shall include correlation identifiers and source context where applicable.

## Repository Pattern

Repositories abstract persistence and expose domain-oriented operations. They shall not leak ORM-specific details or database schema concerns to the domain layer.

## Dependency Rules

- Controllers depend on application services.
- Application services depend on domain contracts.
- Domain logic depends on no framework.
- Infrastructure implements domain and application contracts.
- Persistence adapters are replaceable.

## Infrastructure Layer

Infrastructure includes:

- Database providers.
- External service adapters.
- Logging.
- Configuration.
- Messaging adapters.
- Security providers.
- File or document storage adapters.

Infrastructure must support observability and failure handling.

## Application Layer

Application services orchestrate use cases, transactions, authorization checks, domain operations, and event publication.

Application services do not contain persistence implementation details.

## Domain Layer

The domain layer contains business rules, invariants, domain events, aggregate behavior, policies, and value validation.

## Testing Strategy

Backend testing shall include:

- Domain unit tests.
- Application service tests.
- Controller tests.
- Integration tests.
- API contract tests.
- Architecture dependency tests.
- Security tests.
- E2E platform tests.

Critical clinical workflows require higher assurance and clinical validation.

## Coding Standards

Backend code shall use:

- Strict TypeScript.
- Dependency injection.
- DTOs for external contracts.
- Validation at boundaries.
- Standard exception hierarchy.
- Standard response and error envelopes.
- OpenAPI annotations.
- Logger abstraction.

## Governance

Architecture changes require ADR review. Business modules require approved Domain Blueprints.

