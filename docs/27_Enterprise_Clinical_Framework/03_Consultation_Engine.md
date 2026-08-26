# Consultation Engine

## Purpose

The Consultation Engine provides reusable clinical documentation and workflow sections. It allows each specialty to assemble the consultation it needs without creating a separate documentation architecture.

## Reusable Sections

The engine supports the following conceptual sections:

- History.
- Vital signs and observations.
- Review of systems.
- Physical examination.
- Investigations.
- Procedures.
- Diagnosis and clinical assessment.
- Treatment and prescriptions.
- Plan.
- Disposition.
- Referral.
- Follow-up.
- Attachments and supporting documents.

Specialties select and order sections through an approved module blueprint. A specialty may add a governed section, but it must define ownership, validation, audit, timeline behavior, and interoperability mapping.

## Consultation Lifecycle

1. A consultation is associated with a PatientReference and current encounter.
2. The clinician opens a specialty composition with the relevant sections.
3. Sections load progressively and preserve drafts according to approved workflow policy.
4. The clinician records, reviews, signs, amends, or completes each section.
5. Orders, prescriptions, referrals, procedures, and follow-up actions publish through their owning contexts.
6. The completed consultation is versioned, auditable, and linked to the Digital Patient Folder.

## Section Contract

Every reusable section defines:

- Section identifier and version.
- Display label and clinical purpose.
- Owning bounded context.
- Required and optional fields.
- Validation rules.
- Draft, signed, amended, and completed states.
- Author, reviewer, timestamp, and provenance.
- Patient, encounter, and service references.
- Audit events.
- Timeline projection.
- FHIR, HL7, or other mapping where applicable.

## Clinical Safety

The engine must distinguish draft information from signed clinical evidence. Amendments preserve the prior version. Missing or failed dependencies must not silently remove a section or result. The clinician must be able to see whether a result is pending, verified, amended, or unavailable.

## No Generic Flattening

The engine is reusable but not a replacement for clinical meaning. Eye Clinic, Emergency, ICU, Theatre, and specialty modules may use different terminology and sequencing. Their domain blueprints define the meaning; the engine provides governed composition, persistence contracts, versioning, audit, and workspace integration.

## Governance References

- [Clinical Module Template](04_Clinical_Module_Template.md)
- [Digital Patient Folder](../26_JUTH_Knowledge_Base/07_The_Digital_Patient_Folder.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
