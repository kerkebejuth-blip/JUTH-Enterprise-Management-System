# Architect Instructions

## Purpose

This document instructs AI coding assistants and human developers working on JUTH HOS.

## Authority

The JUTH Enterprise Architecture and Development Constitution is authoritative.

Approved ADRs govern architectural decisions below the Constitution.

Domain Blueprints govern implementation of future bounded contexts.

## Mandatory Rules

- Do not redesign architecture without approval.
- Do not introduce architectural drift.
- Do not implement business domains without approved sprint scope and domain blueprint.
- Do not bypass root quality gates.
- Do not expose patient, clinical, security, or operational risk through undocumented changes.
- Do not replace shared platform infrastructure with module-specific alternatives.

## Implementation Requirements

All production code must conform to:

- Constitution
- Approved ADRs
- Domain Blueprint for the bounded context
- Engineering Handbook
- Security Policy
- Repository quality gates

## AI-Assisted Development

AI tools may assist with implementation, analysis, tests, and documentation, but they do not define architecture.

AI-generated work must be reviewed, validated, and documented like human-authored work.

