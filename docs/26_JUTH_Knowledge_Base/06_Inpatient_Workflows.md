# Inpatient Workflows

## Purpose

Inpatient care extends the patient's longitudinal record through admission, ward movement, nursing documentation, investigations, medication administration, procedures, referrals, discharge, and follow-up.

## Inpatient Continuity

An admission is not a new patient. It is an episode linked to the canonical Patient reference and the relevant encounter. Transfers between wards, services, theatre, laboratory, radiology, pharmacy, intensive care, and other locations must preserve identity, responsibility, location, and timing.

## Required Record Chapters

The inpatient record must be able to connect:

- Admission decision and responsible service.
- Initial and ongoing clinical notes.
- Nursing notes and observations.
- Vital signs and other timestamped measurements.
- Laboratory and radiology requests, results, and reports.
- Medication orders, prescriptions, dispensing, and drug administration.
- Procedures, theatre records, and consent evidence.
- Referrals and responses.
- Progress documentation and changes in responsibility.
- Discharge summary, instructions, referrals, and follow-up.
- Mortality documentation where applicable and authorized.

## Ward Movement

Movement is a governed operational event, not merely a screen update. The receiving service must be able to identify the patient, encounter, current location, responsible team, outstanding work, relevant history, and record availability. Historical locations and prior responsibility remain auditable.

## Discharge and Follow-up

Discharge is complete only when the required clinical documentation, medication information, results, referrals, follow-up, and patient instructions are handled according to policy. The discharge summary becomes a durable chapter of the patient folder and must remain available to authorized future care teams.

## Governance References

- [Hospital Operations](01_Hospital_Operations.md)
- [Digital Patient Folder](07_The_Digital_Patient_Folder.md)
- [Enterprise Pharmacy Philosophy](12_Enterprise_Pharmacy_Philosophy.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
