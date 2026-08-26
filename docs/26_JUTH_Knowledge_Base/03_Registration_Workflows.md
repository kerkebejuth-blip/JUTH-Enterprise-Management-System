# Registration Workflows

## Purpose

Registration establishes or resolves the identity of the person receiving care and begins the operational relationship between the patient, the hospital, the service point, and the patient record.

## Registration Principles

- Search for an existing patient before creating a new record.
- Prefer the MRN or hospital number and other authoritative identifiers over name-only matching.
- Preserve the difference between a technical patient ID, enterprise patient number, facility identifier, MRN, and external identifier.
- Create a provisional identity when policy permits but do not remove audit or review requirements.
- Record source, authority, actor, facility, tenant, time, and verification evidence.
- Never silently overwrite an existing identifier or demographic fact.
- Route uncertain matches and identifier collisions to authorized identity-resolution or Medical Records review.

## Operational Flow

1. The registration actor authenticates and receives facility, department, tenant, and purpose scope.
2. The actor searches the patient index using exact identifiers and approved combinations of name, date of birth, contact information, facility, or prior service context.
3. The system presents a minimum-disclosure result and warns about possible duplicates or restricted records.
4. An existing patient is selected, or a provisional or verified patient record is created according to approved policy.
5. The MRN or hospital number and other identifiers are linked with authority, provenance, and lifecycle state.
6. The registration is associated with the relevant visit, encounter, service point, or referral through an explicit contract.
7. Audit evidence and versioned events are committed so downstream services can continue the patient journey.

## Legacy Search Lesson

Legacy workflows showed that slow search, exact-name dependence, spelling variation, incomplete demographics, and department-only lookup can cause staff to miss an existing record. The enterprise registration process must be fast, explainable, bounded, auditable, and designed to reduce duplicate creation without exposing unnecessary patient data.

## Downtime Registration

Approved downtime registration must use controlled temporary identifiers or paper forms, record the responsible service point, and define reconciliation with the canonical patient index. Recovery must include duplicate review, MRN confirmation, record filing, and audit completion.

## Governance References

- [Medical Records Workflows](02_Medical_Records_Workflows.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
- [JUTH Engineering Manifesto](../00_Project_Management/JUTH_ENGINEERING_MANIFESTO.md)
