# Technology Stack

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document records the approved technology stack for JUTH HOS.

## Repository Tooling

| Technology | Purpose |
| --- | --- |
| PNPM | Workspace dependency management. |
| Turborepo | Root task orchestration and quality gates. |
| TypeScript | Primary implementation language. |
| Prettier | Formatting standard. |
| ESLint | Static analysis and linting. |

## Frontend

| Technology | Purpose |
| --- | --- |
| React | Frontend application framework. |
| Vite | Frontend build tooling. |
| React Router | Frontend routing. |
| React Query | Server-state management. |
| Zod | Validation support. |
| Zustand | Client-state support where appropriate. |
| Storybook | Design-system and component documentation readiness. |
| Vitest | Frontend test runner. |

## Backend

| Technology | Purpose |
| --- | --- |
| NestJS | Backend framework. |
| TypeScript | Backend language. |
| Jest | Backend test runner. |
| Swagger/OpenAPI | API documentation. |
| Prisma Client | Database adapter strategy. |
| PostgreSQL | Relational database target. |
| Helmet | Security headers. |

## Architecture Standards

The stack supports:

- Clean Architecture.
- Domain-Driven Design.
- Modular monolith deployment.
- API-first development.
- Event-driven readiness.
- Healthcare interoperability readiness.

## Governance

Technology changes require architecture review and may require ADR approval.

