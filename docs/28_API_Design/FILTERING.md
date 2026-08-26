# JUTH HOS Filtering

## Purpose

Filtering lets a client request a bounded subset of a resource without coupling the client to persistence syntax. Filters are defined by the owning bounded context and are validated against an allow-list.

## Rules

- Filter names and operators are public contract elements and must be documented.
- Unknown fields and operators are rejected; they are never passed through to a database query.
- Filter values are parsed and validated at the presentation boundary, then converted to application criteria.
- Filters must respect facility, tenant, department, patient, and purpose-of-use scope.
- Sensitive filters require the same authorization as the underlying data.
- Filter composition must have explicit limits on depth, cardinality, and execution cost.

## Query Safety

Filtering must use parameterized persistence operations through repository contracts. It must not accept raw SQL, ORM fragments, or arbitrary field names. Expensive filters should use indexed paths or an approved asynchronous search process.

## Evolution

Adding a filter is normally additive. Changing its meaning, default behavior, authorization scope, or matching semantics is a contract change and requires versioning or an approved compatibility plan.
