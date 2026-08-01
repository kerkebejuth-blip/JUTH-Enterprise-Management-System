# Data Model

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines logical data modeling principles for JUTH HOS.

No business entities are implemented by this document.

## Domain Ownership

Each bounded context owns its language, aggregates, entities, value objects, events, and persistence contracts.

Shared data shall be modeled deliberately and shall not become an ungoverned shared database table.

## Logical Model Elements

Domain Blueprints shall define:

- Aggregates.
- Entities.
- Value Objects.
- Domain Events.
- Integration Events.
- Repository contracts.
- Policies.
- Commands.
- Queries.

## Identifier Rules

Identifiers shall be stable, opaque, globally unique, and suitable for multi-facility operation.

External identifiers shall be modeled separately from internal identifiers.

## Historical Records

Clinical and operational history shall be preserved where required for safety, auditability, reporting, or legal integrity.

Updates that change clinical meaning must be traceable.

## Auditability

Data models shall identify audit requirements:

- Actor.
- Timestamp.
- Action.
- Patient context.
- Encounter context.
- Source.
- Correlation ID.
- Before and after values where required.

## Soft Deletion

Soft deletion shall preserve records that cannot be safely removed. Deleted records must remain excluded from normal workflows unless explicitly requested.

## Versioning and Concurrency

Data models shall identify concurrency risks and versioning requirements. Optimistic concurrency is preferred for user-edited records.

## Terminology and Coding

Clinical models shall identify coding and terminology requirements. FHIR, HL7, DICOM, and local code systems shall be mapped where applicable.

## Multi-Facility Readiness

Data models shall identify facility, department, tenant, and location scope where applicable.

## Reporting

Reporting needs shall not compromise domain integrity. Read models may be introduced when query needs diverge from transactional models.

