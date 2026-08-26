# JUTH HOS Swagger Guidelines

## OpenAPI as a Contract

OpenAPI documentation is maintained with the implementation and reviewed as part of every public API change. It describes public DTOs, authentication requirements, authorization expectations, standard success responses, standard errors, pagination, and version.

## Operation Documentation

Each operation should define:

- A stable tag owned by the bounded context.
- A meaningful operation ID.
- A concise summary and clear purpose.
- Request parameters and DTO schemas.
- Standard success and error responses.
- Security requirements or an explicit public/operational classification.
- Pagination, filtering, and search parameters where applicable.

## Schema Rules

Do not expose Prisma schemas, domain aggregates, internal exception classes, secrets, or implementation-only fields. Examples must use synthetic, non-clinical values and must not resemble real patient data.

## Authentication Placeholders

The platform provides reusable bearer, API-key, and future OAuth documentation hooks. Declaring a Swagger security scheme does not implement authentication or authorize an operation. The owning bounded context and IAM policy must define actual enforcement before exposure.

## Review

OpenAPI changes affecting patient identity, legal records, clinical workflows, billing, interoperability, or security require the relevant architecture and clinical review. Breaking changes require API versioning and an ADR where architectural behavior changes.
