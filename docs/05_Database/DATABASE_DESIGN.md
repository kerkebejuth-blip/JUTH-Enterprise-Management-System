# Database Design

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines high-level database architecture principles for JUTH HOS.

No Prisma models or database schemas are authorized by this document.

## Persistence Philosophy

Persistence shall protect integrity, auditability, historical records, and transaction consistency. Database design supports the domain model; it does not define the domain model.

## Aggregate Design

Aggregate boundaries define consistency boundaries. Each bounded context shall document aggregate roots and persistence ownership in its Domain Blueprint.

Aggregates shall not be split across modules without explicit architectural justification.

## UUID Strategy

Entity identifiers shall use globally unique identifiers suitable for distributed and multi-facility readiness.

UUIDs are the default identifier strategy unless an approved ADR or Domain Blueprint authorizes another strategy.

## Audit Fields

Persisted clinical and operational records shall support audit metadata where applicable:

- Created timestamp.
- Created by.
- Updated timestamp.
- Updated by.
- Deleted timestamp.
- Deleted by.
- Correlation ID.
- Source system.

## Soft Deletes

Soft deletion shall be used where medicolegal, audit, recovery, or clinical record preservation requires retained history.

Hard deletion requires explicit security and governance review.

## Versioning

Versioned entities shall support optimistic locking where concurrent updates could compromise integrity.

Version fields shall be included where Domain Blueprints identify concurrency risk.

## Transactions

Transactions shall protect aggregate consistency and cross-record integrity.

Long-running workflows should not hold database transactions open unnecessarily.

## Migration Strategy

Migrations shall be version controlled, reviewed, tested, and reversible where practical.

Migration naming shall reflect intent and affected area. Production migrations require validation and rollback planning.

## Indexes

Indexes shall be designed around access patterns, search requirements, foreign keys, uniqueness rules, and operational reporting needs.

Indexes shall not be added blindly; each index has write and storage cost.

## Multi-Facility Readiness

Database design shall consider:

- Facility scope.
- Department scope.
- Tenant readiness.
- Patient identity across locations.
- Local and enterprise reporting.
- Data access controls.

## Backup and Recovery

Database operations shall support logical backups, physical backups, restore testing, retention policy, and disaster recovery planning.

## Governance

Database schema changes require review, migration documentation, and test evidence.

