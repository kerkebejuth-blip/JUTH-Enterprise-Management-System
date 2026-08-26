# Enterprise Clinical Module SDK

## Purpose

The Enterprise Clinical Module SDK is the conceptual contract for creating specialty bounded contexts with a consistent structure. It is documentation for future tooling and module teams; this sprint does not implement a generator or command-line package.

The intended developer experience is a governed command such as:

    pnpm hos:create-module cardiology

The command must produce a module that inherits enterprise controls and makes architectural boundaries visible from its first commit.

## Standard Module Structure

    <module>/
    ├── blueprint/
    ├── docs/
    ├── domain/
    │   ├── entities/
    │   ├── value-objects/
    │   ├── aggregates/
    │   ├── events/
    │   ├── services/
    │   ├── specifications/
    │   └── repositories/
    ├── application/
    │   ├── commands/
    │   ├── queries/
    │   ├── services/
    │   └── ports/
    ├── infrastructure/
    │   ├── persistence/
    │   ├── integrations/
    │   └── configuration/
    ├── presentation/
    │   ├── api/
    │   └── workspace/
    ├── workflow/
    ├── forms/
    ├── validators/
    └── tests/

The exact framework layout may follow the host application, but the dependency direction and ownership represented by these boundaries are mandatory.

## Module Manifest

Each module must declare, in its blueprint and implementation metadata:

- Bounded-context name and ownership.
- Capabilities and explicit exclusions.
- Required enterprise dependencies.
- Navigation and workspace extension points.
- Consultation sections used by the specialty.
- Commands, queries, events, and external contracts.
- Permissions, audit events, and data classification.
- Orders, results, documents, referrals, and follow-up integrations.
- Performance budgets and operational dependencies.
- Testing, documentation, and support ownership.

## Extension Points

A module may contribute:

- Navigation entries and specialty workspace tabs.
- Consultation sections and forms.
- Timeline entries and context actions.
- Specialty orders, observations, procedures, and results.
- AI capabilities declared through approved advisory interfaces.
- Events and integration adapters governed by versioned contracts.

Extension points must be additive. A specialty may not replace the enterprise shell, patient context, legal-record custody, identity, billing ledger, or shared security controls.

## Dependency Rules

The domain remains framework-independent. Application services coordinate use cases through ports. Infrastructure implements ports. Presentation translates external interaction into application requests. No presentation component owns a business rule, and no module may access another module's persistence directly.

Patient identity, Medical Records, billing, search, notifications, attachments, prescribing, laboratory, radiology, scheduling, and audit are consumed through explicit contracts.

## Generated Documentation and Tests

The scaffolding process must create a module blueprint, ownership statement, dependency map, workflow description, API boundary notes, security assessment, acceptance criteria, and test plan. Tests should be placed beside the relevant architectural boundary and cover domain invariants, application orchestration, contracts, integration adapters, and critical workflow paths.

## Governance Gate

No generated module is ready for implementation until its bounded-context blueprint is approved, dependencies are reviewed, and its extension points are mapped to the Enterprise Clinical Framework. A generator can provide structure; it cannot authorize domain decisions.
