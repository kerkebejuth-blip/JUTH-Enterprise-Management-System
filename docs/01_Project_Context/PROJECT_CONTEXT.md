# Project Context

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This document defines the business, institutional, clinical, operational, and engineering context for the Jos University Teaching Hospital Enterprise Hospital Operating System (JUTH HOS).

It exists so future contributors can understand why the platform is being built, what constraints govern it, and how implementation must align with the enterprise architecture baseline.

## Institutional Context

Jos University Teaching Hospital is a tertiary teaching hospital with clinical service, training, research, administrative, and operational responsibilities. JUTH HOS is intended to become the digital operating environment that supports this institutional mission.

The system must support:

- Safe patient care.
- Clinical documentation and continuity.
- Departmental and multidisciplinary workflows.
- Hospital administration and operational oversight.
- Education and research readiness.
- Auditable governance.
- Future multi-facility expansion.

## Platform Context

JUTH HOS is an enterprise hospital operating system. It is not a single departmental application, a billing system, or a narrow EMR.

The platform is governed as a modular enterprise system with:

- Shared architecture.
- Shared identity and access management.
- Shared patient workspace.
- Shared data and audit principles.
- Shared integration standards.
- Shared engineering quality gates.

## Stakeholders

Primary stakeholder categories include:

- Project Owner.
- Chief Software Architect.
- Hospital executive leadership.
- Clinicians and clinical departments.
- Nurses and allied health professionals.
- Administrative and finance teams.
- ICT and operations teams.
- Security and compliance reviewers.
- Patients and patient representatives.
- Academic and research stakeholders.
- AI-assisted engineering contributors.

## Constraints

The repository is governed by:

- The JUTH Enterprise Architecture and Development Constitution.
- Approved Architecture Decision Records.
- Domain Blueprint requirements.
- Engineering Handbook standards.
- Security and governance policies.
- Root quality gates and CI validation.

No business or clinical domain may be implemented without approved sprint scope and a Domain Blueprint.

## Implementation Implications

All implementation shall:

- Preserve enterprise architecture.
- Avoid architecture redesign without ADR approval.
- Keep business rules out of controllers and UI components.
- Respect module boundaries.
- Use documented contracts.
- Maintain auditability.
- Protect patient and institutional data.
- Remain testable and maintainable.

## Success Definition

The project context is satisfied when JUTH HOS can support safe, secure, interoperable, maintainable, and scalable hospital operations while remaining governed by repository-resident architecture documentation.

