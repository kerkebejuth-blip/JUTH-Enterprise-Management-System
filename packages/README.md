# Packages

## Purpose

The `packages/` directory contains shared workspace packages used across JUTH HOS applications and services.

## Ownership

Shared package ownership is governed by the platform engineering team under the Chief Software Architect.

## Responsibilities

- Provide reusable contracts, utilities, API clients, UI components, and shared platform capabilities.
- Maintain clear public exports.
- Avoid business-domain ownership unless approved by architecture governance.
- Remain independently typecheckable and buildable where source code exists.

## Public Interfaces

Package public interfaces are exposed through each package `src/index.ts` where applicable.

## Dependencies

Shared packages should keep dependencies minimal and explicit. Application-specific dependencies must not leak into shared packages.

