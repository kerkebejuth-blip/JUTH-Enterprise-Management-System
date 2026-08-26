# Eye Clinic Reference Specialty

## Purpose

Eye Clinic is the reference specialty for the Enterprise Clinical Framework because its workflow requires structured measurements, narrative assessment, procedures, imaging, optical prescribing, follow-up, and continuity across repeated visits. It demonstrates how a specialty can preserve its clinical language while contributing to the shared Digital Patient Folder.

This document is an architectural reference. It does not authorize implementation, define a database schema, or replace an approved Eye Clinic bounded-context blueprint.

## Ownership Boundaries

Eye Clinic owns ophthalmic consultation facts, specialty observations, ophthalmic procedures, ophthalmic assessments, optical prescriptions, and specialty follow-up plans. It does not own patient identity, the legal record, enterprise billing, authentication, or the complete patient timeline.

The module must use the Patient bounded context for identity, Medical Records for legal-record custody and retention, the shared workspace for patient context, and enterprise services for billing, audit, search, notifications, orders, documents, and referrals.

## Reference Workflow

The intended workflow is:

1. Resolve the patient through the enterprise identity and search capabilities.
2. Establish or select the current encounter without creating a duplicate patient record.
3. Open the shared workspace with the Patient Banner, alerts, current encounter, and relevant history.
4. Record ophthalmic measurements and clinical findings.
5. Record assessment, treatment, procedures, referrals, and follow-up.
6. Create optical prescriptions or other orders through governed enterprise contracts.
7. Publish attributable clinical facts and events to the Digital Patient Folder.
8. Preserve a readable, chronological record for later clinicians and Medical Records.

## Clinical Documentation Components

The reference consultation may include:

- Visual acuity, including the eye and measurement context.
- Refraction and optical prescription details.
- Intraocular pressure (IOP), including method and laterality.
- Anterior segment examination.
- Posterior segment examination.
- Fundoscopy findings.
- Eye-specific history, symptoms, and review of systems.
- Eye-specific investigations and imaging.
- Procedures and operative or procedural documentation.
- Diagnosis, treatment plan, referral, and follow-up interval.

Each component must preserve author, time, encounter, provenance, amendments, and clinically meaningful units or laterality where applicable. The module must not flatten structured findings into free text when the distinction is clinically useful.

## Workspace Integration

Eye Clinic uses the shared Patient Banner, Patient Alerts, Current Encounter, Timeline, Orders, Results, Documents, Prescriptions, Billing Status, Clinical Notes, and Audit History. Its central workspace may arrange ophthalmic forms, measurements, images, and findings differently from another specialty, but it must retain the common context and navigation contract.

Specialty data must be discoverable from the longitudinal timeline without requiring clinicians to know the internal Eye Clinic module structure.

## Procedures, Imaging, and Follow-up

Eye-specific procedures and imaging must be recorded as attributable clinical activities and linked to the relevant encounter. Reports and referenced images must be available through governed document and result links. Optical prescriptions must be electronically authored, versioned, auditable, and distinguishable from a clinical medication prescription.

Follow-up must preserve the reason, requested interval, responsible service, and resulting appointment or task reference. A follow-up plan remains part of the patient story even when the next interaction occurs in another department.

## Reference Implementation Acceptance

An implementation aligned to this reference will:

- Reuse enterprise identity and patient context.
- Preserve structured ophthalmic measurements and narrative findings.
- Make prior Eye Clinic history visible in the shared timeline.
- Keep procedures, investigations, prescriptions, and follow-up attributable.
- Integrate through published contracts rather than direct database access.
- Support audit, correction, amendment, downtime reconciliation, and Medical Records review.
- Remain independently evolvable without changing other bounded contexts.

## Future Scope

Future Eye Clinic capabilities may include image viewers, device integration, clinical decision support, visual-field workflows, and AI-assisted documentation. Such capabilities must remain extension points and must not weaken clinician accountability or the legal-record contract.
