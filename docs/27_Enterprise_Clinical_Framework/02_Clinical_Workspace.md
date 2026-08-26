# Clinical Workspace

## Purpose

The Clinical Workspace is the common work surface inherited by every clinic and specialty. It keeps the active patient and care context visible while allowing the centre workspace to be customized for specialty work.

## Shared Workspace Elements

Every clinical module must be able to use:

- **Patient Banner:** identity, MRN or hospital number, demographics, allergies, alerts, and current status.
- **Patient Alerts:** safety, identity, privacy, operational, and unresolved-review warnings.
- **Current Encounter:** visit, department, location, service, responsible team, and status.
- **Timeline:** authorized longitudinal history across encounters and departments.
- **Orders:** links to laboratory, radiology, medication, procedure, and other orders.
- **Results:** verified diagnostic and clinical results with status and filing relationships.
- **Documents:** clinical notes, nursing notes, reports, correspondence, scans, attachments, and consent evidence.
- **Prescriptions:** electronic prescriptions and medication continuity references.
- **Billing Status:** authorized status from the enterprise financial ledger, never local payment truth.
- **Clinical Notes:** versioned documentation owned by the relevant clinical context.
- **Audit History:** authorized access and action history from the enterprise audit boundary.
- **Future AI Panel:** advisory summaries and assistance with clear provenance and human accountability.

## Three-Column Model

The desktop workspace follows the approved three-column model:

1. Clinical Navigator.
2. Customizable Clinical Workspace.
3. AI Clinical Assistant.

The navigator and patient context remain shared. The centre column is the specialty work surface. The AI panel is non-blocking, collapsible, context-aware, and advisory.

## Patient Context Continuity

The active PatientReference and current encounter remain available as the user moves through consultation, orders, results, documents, prescriptions, referrals, and follow-up. A specialty screen must not require the user to reconstruct patient identity from local fields.

## Specialty Customization

The centre workspace may contribute:

- Specialty consultation sections.
- Specialty forms and validation.
- Specialty-specific observations and procedures.
- Specialty order sets and result views.
- Specialty timeline widgets.
- Specialty tasks and follow-up views.

Customization must not hide relevant history, bypass enterprise authorization, create local payment status, duplicate patient identity, or break document and audit linkage.

## Responsive Behavior

- Desktop uses the three-column workspace.
- Tablet collapses the navigator and presents the AI panel as an overlay.
- Mobile uses drawer-based navigation and AI access while preserving patient context.

## Governance References

- [Enterprise Patient Workspace Constitution](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-05-Enterprise-Patient-Workspace.md)
- [Clinical User Experience](../26_JUTH_Knowledge_Base/09_Clinical_User_Experience.md)
- [Digital Patient Folder](../26_JUTH_Knowledge_Base/07_The_Digital_Patient_Folder.md)
