# Applications

## Purpose

The `apps/` directory contains user-facing JUTH HOS applications.

## Ownership

Application ownership is governed by the Chief Software Architect and delegated to application teams through approved sprint plans.

## Responsibilities

- Host deployable frontend applications.
- Consume shared packages and platform services.
- Preserve application boundaries.
- Avoid duplicating shared design system or API client concerns.

## Public Interfaces

Applications expose user interfaces and application-level entry points. They should consume backend APIs and shared packages through documented contracts.

## Dependencies

Applications may depend on `packages/` and approved backend APIs. Applications must not depend on internal implementation details of other applications.

