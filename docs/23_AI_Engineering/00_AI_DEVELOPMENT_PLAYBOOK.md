# AI Development Playbook

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

This playbook governs AI-assisted development for JUTH HOS.

## Operating Rules

- The Constitution is authoritative.
- ADRs govern architecture decisions.
- Domain Blueprints govern bounded-context implementation.
- AI does not define architecture.
- AI-generated changes require human review.
- Runtime code changes require quality gates.
- Clinical or business features require approved sprint scope.

## Allowed AI Uses

AI may assist with:

- Repository analysis.
- Documentation drafting.
- Test planning.
- Code review support.
- Refactoring proposals.
- Implementation within approved scope.
- Risk identification.

## Prohibited AI Uses

AI shall not:

- Invent business rules.
- Redesign architecture without approval.
- Add clinical modules without Domain Blueprint approval.
- Expose patient data or secrets.
- Bypass validation gates.
- Replace clinical judgment.

## Review Requirements

AI-assisted work must be reviewed for architecture, security, correctness, maintainability, testing, and clinical safety where applicable.

