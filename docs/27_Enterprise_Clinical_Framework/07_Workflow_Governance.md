# Clinical Workflow Governance

## Purpose

Clinical modules operate inside one enterprise platform. This governance contract ensures that a specialty workflow remains clinically useful without bypassing identity, legal-record, security, financial, audit, or interoperability responsibilities.

## Capabilities Every Specialty Inherits

Every specialty must integrate with the following enterprise capabilities:

- Authentication and authorization.
- Patient identity and enterprise search.
- Medical Records custody, filing, amendment, release, and retention.
- Audit logging and attributable actions.
- Enterprise billing and payment status.
- Notifications and task delivery.
- Attachments and scanned-document handling.
- Laboratory ordering and result integration.
- Radiology ordering, reporting, and image availability.
- Electronic prescribing and medication history.
- Referral, follow-up, and scheduling.
- Patient timeline and observations.
- Clinical documentation and versioning.
- Interoperability contracts and data provenance.

The specialty owns its care workflow, not these shared responsibilities.

## Patient and Encounter Continuity

The active patient and current encounter must remain visible while clinicians move through specialty workflows. Every material action must link to the patient, encounter, author, time, department, facility, and applicable provenance. A specialty must not create a local identity or an isolated history that hides information from the shared Digital Patient Folder.

## Safety and Authorization

Actions that create, amend, approve, dispense, release, export, or delete clinical information require explicit authorization and an attributable actor. Security decisions fail closed. A user interface convenience must never bypass server-side policy, audit, consent, or legal-record rules.

## Billing Coordination

Specialties consume the enterprise payment status and published payment events. They do not maintain a competing payment state. A completed payment must become visible to the downstream workflow through the governed integration path without manual synchronization.

## Orders, Results, and Documents

Clinical requests must be electronic, attributable, status-aware, and connected to the patient timeline. Results must retain provenance, authoring or validation information, correction history, and notification status. Documents and attachments must be discoverable in the patient folder and governed by Medical Records.

## Downtime and Reconciliation

Approved downtime procedures must preserve patient safety and legal continuity. On restoration, paper or offline records are reconciled through an attributable process, with source, author, time, and amendment history retained. Downtime is an exception path, not a parallel permanent workflow.

## Interoperability and Versioning

Module interfaces are published through versioned APIs and events. Additive changes are preferred. Breaking changes require review, migration planning, compatibility arrangements, and an approved ADR where architectural direction changes.

## Workflow Review Gate

Before a specialty is implemented, its blueprint must show how each required enterprise capability is consumed, how failures are handled, and how every clinical artifact reaches the Digital Patient Folder. No orphan information, hidden history, or manual workaround may be accepted as the normal design.
