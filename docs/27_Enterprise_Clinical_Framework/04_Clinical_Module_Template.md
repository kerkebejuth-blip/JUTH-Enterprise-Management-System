# Clinical Module Template

## Purpose

Every specialty must start from the same architecture and governance template. The template preserves enterprise consistency while allowing specialty-specific clinical language and workflow.

## Standard Module Structure

```text
<specialty-module>/
├── blueprint/
│   └── <specialty>-domain-blueprint.md
├── docs/
│   ├── workflow.md
│   ├── clinical-safety.md
│   └── interoperability.md
├── domain/
│   ├── aggregates/
│   ├── entities/
│   ├── value-objects/
│   ├── events/
│   ├── rules/
│   └── specifications/
├── application/
│   ├── commands/
│   ├── queries/
│   ├── services/
│   └── policies/
├── infrastructure/
│   ├── repositories/
│   ├── mappers/
│   └── integrations/
├── presentation/
│   ├── controllers/
│   ├── dto/
│   └── schemas/
├── workflow/
│   ├── states/
│   ├── transitions/
│   └── tasks/
├── forms/
├── validators/
└── tests/
```

The structure is a design contract. Physical placement may evolve through an approved ADR, but domain and dependency boundaries must remain intact.

## Required Module Definition

Before implementation, the specialty blueprint must define:

- Vision and scope.
- Out-of-scope responsibilities.
- Ubiquitous language.
- Bounded context and ownership.
- Aggregates, entities, and value objects.
- Commands, queries, policies, and workflows.
- Domain and integration events.
- Repository contracts and application services.
- Security, audit, performance, and clinical safety requirements.
- API and UI boundaries.
- Patient folder and timeline contributions.
- FHIR, HL7, DICOM, or other interoperability mappings.
- Testing and acceptance criteria.
- Open questions and future extensions.

## Candidate Specialties

The template applies to Eye Clinic, SOPD, MOPD, ENT, Dental, Psychiatry, Physiotherapy, Cardiology, Neurology, Oncology, Family Medicine, Paediatrics, Orthopaedics, Plastic Surgery, General Surgery, Urology, Obstetrics, Gynaecology, Emergency, ICU, Theatre, and future specialties.

## Enterprise Inheritance Checklist

A module is not ready for implementation until it demonstrates integration with Patient identity, Medical Records, authentication, authorization, audit, billing, search, notifications, attachments, laboratory, radiology, electronic prescribing, referrals, follow-up, scheduling, timeline, observations, documentation, versioning, and interoperability governance.

## Governance References

- [Domain Blueprint Template](../02_Domain_Blueprints/Template.md)
- [Clinical Module Architecture](01_Clinical_Module_Architecture.md)
- [Workflow Governance](07_Workflow_Governance.md)
