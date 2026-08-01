# API Package

## Purpose

The API package contains shared frontend API client infrastructure.

## Ownership

Owned by platform engineering.

## Responsibilities

- Provide typed API client exports.
- Keep transport concerns reusable.
- Avoid embedding business workflow logic.

## Public Interfaces

Public exports are defined in `src/index.ts`.

## Dependencies

This package depends on its declared HTTP client/runtime dependencies only.

