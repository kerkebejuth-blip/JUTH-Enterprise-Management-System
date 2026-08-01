# Business Rules

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

Business rules shall be documented and implemented through approved bounded contexts.

## Rule Ownership

Business rules belong in:

- Domain models.
- Domain services.
- Policies.
- Application services when orchestration is required.

Business rules do not belong in controllers, UI components, or persistence adapters.

## Documentation

Every future Domain Blueprint must define business rules, invariants, policies, workflows, and acceptance criteria.

