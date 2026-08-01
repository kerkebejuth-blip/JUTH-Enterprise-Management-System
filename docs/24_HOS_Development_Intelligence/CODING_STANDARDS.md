# Coding Standards

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document records coding standards for human and AI-assisted contributors.

## General Standards

- Use TypeScript.
- Prefer explicit types.
- Keep functions focused.
- Avoid duplication.
- Use dependency injection where applicable.
- Separate business logic from presentation and infrastructure.
- Preserve module boundaries.
- Write code that is testable and readable.

## Backend Standards

- Controllers coordinate requests.
- Application services orchestrate use cases.
- Domain objects own business rules.
- Repositories abstract persistence.
- DTOs define API contracts.
- Exceptions use the enterprise hierarchy.

## Frontend Standards

- Use functional React components.
- Use shared design-system components.
- Separate presentation from business logic.
- Preserve accessibility.
- Keep state ownership explicit.

## Validation

Run root quality gates before merge.

