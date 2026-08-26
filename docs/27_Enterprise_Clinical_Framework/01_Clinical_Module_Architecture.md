# Clinical Module Architecture

## Purpose

Clinical modules are bounded contexts within one Enterprise Hospital Operating System. They represent real clinical responsibilities while preserving the continuity of the Digital Patient Folder.

## Bounded Contexts

| Context                     | Owns                                                                           | Does not own                                                        |
| --------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Patient                     | Identity, MRN linkage, demographic identity, identity resolution               | Encounters, clinical notes, billing, records custody                |
| Medical Records             | Legal record custody, filing, release, retention, archive, completeness        | Specialty clinical meaning or patient identity truth                |
| Encounter and Care Delivery | Visits, encounters, episodes, location, responsibility, movement               | Canonical patient identity or specialty clinical facts              |
| Clinical Specialty          | Specialty consultation, assessment, procedures, plans, and specialty documents | Other specialties' clinical rules or enterprise patient identity    |
| Laboratory                  | Orders, samples, laboratory validation, results, and reports                   | Patient identity, financial ledger, or other diagnostic meaning     |
| Radiology                   | Imaging requests, scheduling, studies, reports, and image references           | Patient identity or imaging storage outside its boundary            |
| Pharmacy                    | Prescriptions, dispensing, medication workflow, and pharmacy status            | Patient identity, clinical judgment, or enterprise financial ledger |
| Nursing                     | Nursing documentation, observations, and administration records                | Prescribing policy or patient identity                              |
| Revenue Cycle               | Charges, payments, adjustments, refunds, and financial status                  | Clinical record content or patient identity                         |
| Scheduling and Referral     | Appointments, referrals, responses, and follow-up coordination                 | Clinical decision ownership                                         |

The table is a governance map. Physical deployment may remain a modular monolith initially, but ownership and interfaces must be explicit from the beginning.

## Common Dependencies

Every clinical module consumes, through approved contracts:

- Patient identity and PatientReference.
- Encounter, location, department, and responsible-team context.
- Medical Records document and filing contracts.
- Enterprise IAM authorization and session context.
- Audit and security event contracts.
- Enterprise billing status and payment events where applicable.
- Shared search, notification, attachment, timeline, observation, scheduling, referral, laboratory, radiology, and prescribing capabilities.

Consumers must not read another bounded context's tables or persistence entities. A cached projection must carry source version and freshness information and cannot become a competing source of truth.

## Module Responsibilities

Each specialty module must:

- Define its ubiquitous language and aggregate boundaries.
- Own its specialty-specific rules and documentation.
- Use the shared Patient and encounter references.
- Publish material domain and integration events.
- Maintain auditability, authorization, versioning, and error behavior.
- Provide its workflow through the shared Clinical Workspace.
- Preserve every artifact in the Digital Patient Folder relationship.
- Support progressive enhancement without blocking the core patient context.

## Extension Points

Approved extension points include:

- Workspace navigation and tabs.
- Consultation sections and specialty forms.
- Clinical widgets and timeline contributions.
- Orders, results, documents, prescriptions, procedures, and follow-up actions.
- Notifications, referrals, attachments, and AI assistance.
- Specialty-specific terminology and validation policies.

Extensions must be additive. A specialty may customize the centre workspace but may not replace the shared patient context, enterprise navigation, security controls, audit, or record linkage.

## DDD and Clean Architecture

Each clinical module follows Domain, Application, Infrastructure, Presentation, and Workflow boundaries. Dependencies point inward. The domain remains framework-independent. Controllers and UI components coordinate or present; they do not contain clinical rules.

## Governance References

- [Clinical Module Template](04_Clinical_Module_Template.md)
- [Workflow Governance](07_Workflow_Governance.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
- [Constitution Volume 04](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-04-Clinical-Domain-Architecture.md)
