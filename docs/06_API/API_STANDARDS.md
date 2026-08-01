# API Standards

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines API design and implementation standards for JUTH HOS.

## REST Standards

REST resources shall use clear nouns, predictable hierarchy, and HTTP methods consistently.

Controllers coordinate requests. They shall not own business rules.

## Naming

Endpoint names shall be:

- Lowercase.
- Hyphenated where needed.
- Versioned.
- Domain-aligned.
- Stable across clients.

## Status Codes

APIs shall use appropriate HTTP status codes:

- `200` success.
- `201` created.
- `204` no content.
- `400` validation or malformed request.
- `401` unauthenticated.
- `403` unauthorized.
- `404` not found.
- `409` conflict.
- `500` unexpected server error.

## DTO Contracts

DTOs define external contracts. ORM entities, database rows, and domain internals shall not be exposed directly.

## Validation

Validation shall be explicit, deterministic, and user-safe. Invalid input must not reach domain operations.

## Pagination

Pagination metadata shall be returned in the response envelope metadata.

## Filtering

Filters shall be allowlisted. Unsupported filters must fail with a clear validation error.

## Sorting

Sort fields shall be allowlisted. Sort direction shall be constrained to approved values.

## Error Handling

Errors shall use the standard error envelope and enterprise error codes.

## Authentication

Authentication is required by default. Public routes require explicit review.

## Authorization

Authorization shall use roles, permissions, claims, policies, scope, and fail-closed behavior.

## OpenAPI

OpenAPI documentation must remain aligned with implementation and should be updated in the same change as API contract changes.

