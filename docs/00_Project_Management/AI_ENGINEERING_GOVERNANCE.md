# AI Engineering Governance

## Status

Version 1.0 Enterprise Governance Baseline.

## Purpose

This document governs AI-assisted engineering for JUTH HOS.

## Rules

- AI tools assist; they do not define architecture.
- AI output requires human review.
- AI must follow the Constitution, ADRs, Domain Blueprints, and Engineering Handbook.
- AI must not invent clinical or business rules.
- AI must not implement business domains without approved sprint scope.
- AI must not expose secrets, credentials, or patient data.
- AI-generated implementation must pass validation gates.

## Required References

AI-assisted work shall consult:

- `ARCHITECT_INSTRUCTIONS.md`
- Constitution volumes.
- ADRs.
- Domain Blueprint template.
- AI Engineering knowledge base.

## Freeze Rule

AI prompts that change architecture require architecture review before implementation.

