# JUTH Enterprise Clinical Framework

## Purpose

The Enterprise Clinical Framework governs every current and future clinical bounded context in JUTH HOS. It translates the institutional patient-folder philosophy into reusable clinical architecture, workspace conventions, consultation composition, integration contracts, performance expectations, and safety controls.

The framework does not replace a domain blueprint. Each specialty must have an approved blueprint and must implement within the boundaries defined here.

## Governing Principles

- Patient owns identity and stable patient references.
- Medical Records owns the legal health record, custody, filing, release, and retention policy.
- Clinical modules own specialty-specific consultation and care workflows.
- Every clinical module contributes to one lifelong Digital Patient Folder.
- No clinical information may become orphaned.
- Enterprise governance is inherited, not reimplemented locally.
- Clinical staff remain accountable for clinical decisions.
- Performance is a clinical safety requirement.
- Modules communicate through versioned APIs and events, never direct database coupling.

## Framework Documents

| Document                                                                       | Responsibility                                                  |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| [Clinical Module Architecture](01_Clinical_Module_Architecture.md)             | Bounded contexts, ownership, dependencies, and extension points |
| [Clinical Workspace](02_Clinical_Workspace.md)                                 | Shared patient-centred work surface                             |
| [Consultation Engine](03_Consultation_Engine.md)                               | Reusable consultation sections and lifecycle                    |
| [Clinical Module Template](04_Clinical_Module_Template.md)                     | Standard specialty module structure                             |
| [Eye Clinic Reference](05_Eye_Clinic_Reference.md)                             | Reference specialty model for implementation planning           |
| [Clinical Module SDK](06_Clinical_Module_SDK.md)                               | Conceptual scaffolding and module package contract              |
| [Workflow Governance](07_Workflow_Governance.md)                               | Enterprise capabilities every specialty must inherit            |
| [Clinical Performance](08_Clinical_Performance.md)                             | Measurable performance and observability requirements           |
| [SmartClinic Engineering Principles](09_SmartClinic_Engineering_Principles.md) | Permanent responses to known legacy limitations                 |
| [Enterprise Clinical Integration](10_Enterprise_Clinical_Integration.md)       | APIs, events, external systems, and boundary rules              |
| [AI Extension Points](11_AI_Extension_Points.md)                               | Advisory AI capabilities and safety controls                    |
| [Long-Term Clinical Architecture](12_Long_Term_Clinical_Architecture.md)       | 20-30 year evolution and deployment vision                      |

## Required Reading for a New Specialty

Before implementation, a team must read this framework, the [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md), the applicable institutional knowledge documents, and the Constitution and ADRs. The team must then produce an approved bounded-context blueprint using the [Domain Blueprint Template](../02_Domain_Blueprints/Template.md).

## Governance

Changes to ownership, dependency direction, shared workspace, consultation contracts, enterprise workflow obligations, integration boundaries, or AI safety controls require architecture review and may require an ADR.
