# JUTH Enterprise Hospital Operating System (JUTH HOS)

Enterprise Architecture & Development Constitution

Volume 02

Backend Architecture

Document ID:  
JUTH-CONSTITUTION-V02

Version:  
1.0

Status:  
Approved Draft

Authority:  
Chief Software Architect

## 1. PURPOSE

This document defines the constitutional architecture governing every backend service, module, package, API, and infrastructure component within JUTH HOS.

Every backend implementation shall comply with this document.

## 2. TECHNOLOGY PLATFORM

Backend Framework:  
NestJS

Language:  
TypeScript

Workspace:  
Turborepo + PNPM

API:  
REST-first

Documentation:  
OpenAPI / Swagger

Database:  
Enterprise relational database architecture (implementation defined separately)

## 3. BACKEND PHILOSOPHY

The backend is not a collection of CRUD endpoints.

It represents the clinical domain.

Business rules belong inside the domain model.

Controllers coordinate.

Services orchestrate.

Repositories persist.

Infrastructure supports.

## 4. LAYERED ARCHITECTURE

Backend responsibilities are separated into the following layers:

Presentation

Application

Domain

Infrastructure

Persistence

External Integration

Dependency direction is governed by Clean Architecture.

Outer layers depend upon inner layers.

Never the reverse.

## 5. MODULE STRUCTURE

Every backend module shall contain only responsibilities belonging to that domain.

Examples include:

Identity

Patient

Encounter

Orders

Laboratory

Radiology

Pharmacy

Billing

Scheduling

Notification

Audit

Configuration

Reporting

Modules communicate through explicit interfaces.

## 6. DOMAIN MODEL

Business behaviour belongs to:

Entities

Value Objects

Aggregates

Domain Services

Repositories

Domain Events

Application Services coordinate domain behaviour.

## 7. API DESIGN

REST-first.

Consistent endpoint naming.

Versioning strategy.

DTO separation.

Validation.

OpenAPI generation.

No database entities exposed directly.

## 8. SECURITY

Authentication

Authorization

RBAC

PBAC readiness

Audit logging

Input validation

Secrets management

Least privilege

Fail-closed security

## 9. EVENT-DRIVEN READINESS

Modules should publish domain events.

Future messaging systems shall consume events without requiring architectural redesign.

## 10. CQRS READINESS

Read and write models may evolve independently.

Current implementation remains intentionally simple until complexity requires CQRS.

## 11. OBSERVABILITY

Logging

Metrics

Tracing

Health checks

Performance monitoring

## 12. ERROR HANDLING

Consistent exception hierarchy.

Meaningful error responses.

Clinical safety over convenience.

## 13. TESTING

Unit tests

Integration tests

Architecture validation

End-to-end testing

## 14. EVOLUTION

Backend architecture evolves through ADRs.

Breaking architectural changes require review and approval.

## 15. SUMMARY

The backend exists to model healthcare operations faithfully while remaining secure, maintainable, scalable, and clinically safe.
