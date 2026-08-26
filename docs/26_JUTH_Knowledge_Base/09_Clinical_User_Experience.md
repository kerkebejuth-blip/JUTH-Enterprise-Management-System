# Clinical User Experience

## Purpose

The JUTH clinical user experience must help clinicians and hospital workers deliver care safely under real tertiary-hospital workload. The interface is part of the operating environment, not decoration around the software.

## Principles

- Clinicians are primary users and their workflow is the design reference.
- The active patient, MRN or hospital number, encounter, location, and responsibility must remain clear.
- Common tasks require minimal clicks and minimal navigation.
- The patient context follows the worker across departments and specialties.
- Historical records must be discoverable without forcing users through unrelated departmental screens.
- Screens open quickly and load progressively.
- Routine actions support keyboard navigation where appropriate.
- The experience must remain usable during busy clinics and high patient volumes.
- Warnings about duplicate identity, uncertainty, stale data, and restricted access must be clear and actionable.

## Enterprise Workspace

Specialty workflows extend the Enterprise Patient Workspace. Shared layout, navigation, patient banner, clinical context, notification, modal, and accessibility capabilities must remain consistent. A specialty may add its own clinical work surface but must not replace the shared patient context or create a competing patient identity view.

## Cognitive Load

The system should present the right information at the right time, use familiar hospital language, preserve the sequence of work, and avoid unnecessary interruptions. A screen that is technically correct but causes staff to repeat data, search across hidden locations, or remember undocumented steps is not clinically successful.

## Safe Interaction

Patient selection, identity confirmation, medication actions, orders, results, referrals, and document signing require clear context and attributable intent. The interface must not hide material status or silently infer a patient, payment, result, or clinical decision.

## Governance References

- [Enterprise Patient Workspace](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-05-Enterprise-Patient-Workspace.md)
- [JUTH Engineering Manifesto](../00_Project_Management/JUTH_ENGINEERING_MANIFESTO.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
