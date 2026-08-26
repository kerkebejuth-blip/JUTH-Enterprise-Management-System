# Enterprise Billing Philosophy

## Institutional Principle

JUTH HOS shall use one enterprise financial ledger, one authoritative payment status, and one source of truth for payment state. The Revenue Cycle or Finance bounded context owns financial persistence and policy.

## No Duplicate Payment State

Clinical, outpatient, laboratory, radiology, pharmacy, theatre, admission, and other modules may create billable references or consume an authorized financial status. They must not own payment persistence or maintain module-specific payment states that compete with the enterprise ledger.

## Payment Propagation

Payment updates must propagate automatically through versioned contracts and events. Consumers must handle retries idempotently and must distinguish confirmed, pending, failed, reversed, refunded, and unknown states.

A completed payment must immediately unlock downstream workflows according to approved policy without manual synchronization. If Finance or an integration dependency is temporarily unavailable, the workflow must show the uncertainty, apply the approved safe behavior, and create an auditable reconciliation path.

## SmartClinic Improvement

This architecture directly eliminates SmartClinic payment synchronization problems. No module may infer payment from a local copy that can become stale. Consultation must not be blocked merely because one local screen has not received an update. Payment-dependent policy remains explicit, but its status comes from the enterprise ledger and its propagation is observable.

## Audit and Reconciliation

Charges, payments, adjustments, reversals, refunds, status changes, access, and reconciliation actions require attributable audit evidence. Duplicate events, delayed responses, partial failures, and provider disputes must be recoverable without creating competing financial truth.

## Patient Relationship

Patient stores only the governed identity and billing references required for continuity. Patient does not calculate charges, receive payments, own financial status, or access Finance persistence directly.

## Governance References

- [SmartClinic Lessons Learned](08_SmartClinic_Lessons_Learned.md)
- [Patient Domain Blueprint](../02_Domain_Blueprints/Patient_Domain_Blueprint.md)
- [Enterprise Integration Standards](../00_Project_Management/JUTH_ENTERPRISE_ARCHITECTURE_AND_DEVELOPMENT_CONSTITUTION/Volume-07-Integration-Standards.md)
