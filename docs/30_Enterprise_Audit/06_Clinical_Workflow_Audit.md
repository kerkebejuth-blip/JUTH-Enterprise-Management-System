# Clinical Workflow Architecture Audit

Score: 34/100

## Evidence Reviewed

- Business architecture documents under `docs/04_Architecture`.
- Capability model under `docs/29_Capability_Model`.
- Backend modules under `services/hos-api/src/modules`.
- Staff portal routes under `apps/staff-portal/src/app/router/router.tsx`.

## Strengths

- Hospital domains are documented in `docs/00_HOS_BLUEPRINT.md`, including patient identity, care delivery, diagnostics, pharmacy, nursing, emergency, theatre, medical records, finance, supply chain, academic, and governance domains.
- Staff portal navigation anticipates enterprise hospital modules.
- Backend has not introduced unauthorized business entities during the platform sprint.

## Gaps

| Severity | Location | Finding | Clinical Impact | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| High | `services/hos-api/src/modules` | No clinical bounded contexts exist yet. | Patient registration, EMR, orders, results, medication, admissions, and discharge workflows cannot execute. | Define clinical module architecture and context contracts before first clinical implementation. | P1 | L |
| High | repository search | No FHIR, HL7, DICOM, terminology, coding, or interoperability contracts were found in source. | Enterprise healthcare integration readiness is absent at implementation level. | Create interoperability foundation with FHIR/HL7/DICOM strategy, adapters, and terminology services. | P1 | L |
| Medium | `apps/staff-portal/src/app/router/router.tsx:17` | Many clinical/administrative routes render `Placeholder`. | User-facing workflow architecture is not yet implemented. | Replace reserved foundations only when corresponding backend context exists. | P2 | L |
| Medium | `apps/staff-portal/src/modules/patient-workspace` | Patient workspace UI exists ahead of backend patient domain. | Frontend/business drift risk if clinical model is not governed. | Freeze patient UI as prototype or align with formal Patient Registration context. | P2 | M |

## Clinical Safety Conclusion

The repository can become a healthcare platform, but current source code does not yet provide executable clinical workflows or interoperability foundations. It should not be deployed into clinical care pathways.

