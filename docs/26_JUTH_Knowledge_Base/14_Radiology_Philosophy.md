# Radiology Philosophy

## Purpose

Radiology must provide an electronic, traceable imaging workflow in which a request, schedule, study, report, amendment, and image availability reference remain connected to the patient and relevant encounter.

## Electronic Imaging Requests

Authorized services create electronic imaging requests containing the Patient reference, encounter, requesting service, clinical context, priority, and actor. Paper requests are limited to approved downtime or legal requirements and must be reconciled.

## Scheduling and Performance

Scheduling must make status, appointment, location, priority, cancellation, and rescheduling visible to authorized staff. Queue and status changes must be attributable. Delays and failed dependencies must be observable rather than represented as silent absence.

## Reporting and Image Availability

Radiology owns imaging workflow and report content. Reports are versioned, attributable, validated, and linked to the request and study. Image availability is represented through a governed reference to the imaging or PACS environment; the Patient context does not own DICOM studies or imaging storage.

## Timeline Integration

Requests, study status, reports, amendments, and authorized image references become part of the patient's continuous timeline. A report must remain discoverable after the patient moves between departments or returns years later.

## Integration Boundaries

Radiology and integration adapters may use DICOM, HL7, FHIR, REST, and approved partner contracts. External models remain outside the Patient aggregate. All interfaces are versioned, backward-compatible for the supported lifecycle, and protected from direct database coupling.

## Governance References

- [Digital Patient Folder](07_The_Digital_Patient_Folder.md)
- [Outpatient Workflows](04_Outpatient_Workflows.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
- [Constitution Volume 07](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-07-Integration-Standards.md)
