# Outpatient Workflows

## Purpose

Outpatient services extend the patient's lifelong record through consultations, investigations, treatment, referrals, and follow-up. General outpatient and specialty clinics must use the shared enterprise patient context rather than creating isolated patient histories.

## Common Flow

1. Registration or the service point resolves the patient and confirms the MRN or hospital number.
2. The current visit, encounter, department, location, and responsible team are established through the appropriate bounded context.
3. The clinician reviews relevant history, alerts, allergies, medications, prior investigations, referrals, and follow-up information allowed by authorization.
4. The consultation is documented as a versioned clinical record.
5. Orders, prescriptions, referrals, procedures, and follow-up plans are created through their owning contexts.
6. Results and responses return through electronic contracts and are filed into the patient's continuous history.
7. The encounter is closed with appropriate documentation, outstanding work, and follow-up status.

## Specialty Continuity

Eye Clinic, Dental, physiotherapy, general outpatient, and other specialty clinics may have different clinical workflows, but they share identity, patient context, documentation linkage, and audit principles. A specialty must not create its own patient number, isolated history, or local payment truth.

## Usability Requirements

Outpatient workflows must support busy clinics, low navigation overhead, progressive loading, fast patient search, clear patient selection, keyboard-friendly high-volume work where appropriate, and visible outstanding tasks. The interface must reflect the clinic's responsibility rather than forcing staff to reason about internal software modules.

## Continuity Requirements

Investigations, prescriptions, referrals, procedures, and follow-up actions remain linked to the patient and relevant encounter. A patient returning after a long interval or attending another department must not appear as a new person solely because the local workflow differs.

## Governance References

- [Hospital Operations](01_Hospital_Operations.md)
- [Digital Patient Folder](07_The_Digital_Patient_Folder.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
- [Enterprise Patient Workspace](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-05-Enterprise-Patient-Workspace.md)
