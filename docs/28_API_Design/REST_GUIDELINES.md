# JUTH HOS REST Guidelines

## Purpose

These guidelines define the REST conventions inherited by every JUTH HOS bounded context. They complement the [Enterprise Backend Architecture](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-02-Backend-Architecture.md) and the [Engineering Manifesto](../00_Project_Management/JUTH_ENGINEERING_MANIFESTO.md).

## Resource Boundaries

- Model endpoints around owned resources and use plural nouns.
- Keep bounded-context ownership explicit in the module that exposes a resource.
- Do not expose Prisma models, domain aggregates, or persistence records directly.
- Use application services to coordinate requests and presenters or mappers to create public views.
- Reference patients through governed identifiers and patient references; do not duplicate the complete Digital Patient Folder in another module.

## URI Convention

Business and platform application APIs use `/api/v1/{resource}`. The version is part of the public contract. Operational probe endpoints remain version-neutral where required by deployment tooling: `/health`, `/ready`, `/live`, `/info`, and `/version`.

## HTTP Semantics

- `200 OK` for successful reads and idempotent updates that return a representation.
- `201 Created` when a new resource is created and the response identifies it.
- `202 Accepted` only when processing is intentionally asynchronous and its status can be observed.
- `204 No Content` when a successful operation has no response representation.
- `400 Bad Request` for malformed or invalid request contracts.
- `401 Unauthorized` when authentication is missing or invalid.
- `403 Forbidden` when the actor is authenticated but not permitted.
- `404 Not Found` when the requested resource is not available within the actor's scope.
- `409 Conflict` for concurrency, identity, or state conflicts.
- `422 Unprocessable Entity` when a syntactically valid request cannot satisfy an approved domain policy.
- `429 Too Many Requests` for rate-limit enforcement.
- `500` and `503` responses must not disclose implementation details or stack traces.

## Request Rules

Requests must be validated at the presentation boundary, carry correlation and request identifiers, and use explicit DTOs. Mutating operations should support idempotency where retries could otherwise repeat a material action.

## Response Rules

All successful responses use the [standard response format](RESPONSE_FORMAT.md). All errors use the [standard error format](ERROR_HANDLING.md). API contracts must be documented in OpenAPI and tested at the boundary.

## Compatibility

Breaking changes require a new API version or an approved compatibility strategy. Additive fields and endpoints must not change the meaning of existing fields. Published contracts require ownership, deprecation notice, migration guidance, and an ADR when the change affects architecture.
