# JUTH HOS API Versioning

## Policy

JUTH HOS uses URI versioning for application APIs. The current version is `v1`, so future bounded-context endpoints resolve through `/api/v1/`.

Operational health and process-probe endpoints remain version-neutral to preserve deployment integration: `/health`, `/ready`, `/live`, `/info`, and `/version`.

## Rules

- A version identifies a compatible public contract, not an internal implementation release.
- Controllers declare the API version explicitly or inherit the configured default.
- Version changes are required for breaking changes to paths, request semantics, response meanings, authorization behavior, or data interpretation.
- Additive, backward-compatible changes may remain within the current version when documented and tested.
- Consumers must not depend on undocumented fields, ordering, error strings, or persistence identifiers.
- Deprecated versions require a published retirement date, migration path, monitoring, and owner.

## Evolution

Versioning does not permit duplicate business logic. Shared application behavior should remain behind stable application contracts, while version-specific presenters or adapters translate the public representation when necessary.

All cross-system integrations use versioned APIs or events. Direct database coupling is prohibited. Changes affecting FHIR, HL7, DICOM, billing, Medical Records, or patient identity require the relevant architectural and clinical review.
