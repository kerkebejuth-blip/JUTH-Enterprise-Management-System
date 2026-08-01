# Naming Conventions

## Status

Version 1.0 Enterprise Architecture Baseline.

## Purpose

Names must preserve clarity, clinical meaning, and maintainability.

## Rules

- Use domain language from approved Domain Blueprints.
- Use descriptive names.
- Avoid abbreviations unless clinically or technically standard.
- Name DTOs by boundary and purpose.
- Name events by completed business fact.
- Name commands by requested action.
- Name queries by requested read intent.

## Examples

- `RegisterPatientCommand`
- `PatientRegisteredEvent`
- `FindPatientByHospitalNumberQuery`
- `PatientSummaryDto`

