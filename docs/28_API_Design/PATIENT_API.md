# Patient Identity API

This document defines the first presentation slice for the Patient bounded context. It exposes clinic-neutral identity reads above the approved Patient application layer. Registration, update, merge, split, archive, restore, encounters, consultations, and clinical records remain outside this slice.

## Boundary

The Patient API is served by `services/hos-api` under the versioned business prefix:

```text
/api/v1/patients
```

The controller delegates to application query handlers. It does not access Prisma, persistence models, or domain aggregates directly.

## Authorization

Patient identity reads require authentication and the `PATIENT_READ` permission. The current repository deliberately fails closed because the authentication provider is not yet configured. No development bypass or public patient-data route is permitted.

## Get Patient By ID

```text
GET /api/v1/patients/{patientId}
```

`patientId` is the enterprise Patient UUID. A successful response contains the approved clinic-neutral patient detail projection inside the standard response envelope. A missing identity maps to the enterprise `NOT_FOUND` error contract.

## Search Patients

```text
GET /api/v1/patients?search={term}&page=1&pageSize=25&sort=name&direction=asc
```

Search is bounded and minimum-disclosure. The initial adapter supports indexed matching against the approved identity fields and normalized identifiers. The public sort allow-list is `name`, `hospitalNumber`, and `updatedAt`.

The response data contains:

- `items`: patient summary projections only.
- `pagination`: page, page size, total items, and total pages.

The API must never silently register a patient when search returns no match. Duplicate resolution, merge, and split remain governed application workflows and are not part of this read slice.

## Response and Error Contracts

Responses use the standards in [Response Format](RESPONSE_FORMAT.md), [Pagination](PAGINATION.md), [Error Handling](ERROR_HANDLING.md), and [Security Guidelines](SECURITY_GUIDELINES.md). Patient data is never returned as a domain entity or persistence model.

## Audit and Correlation

Every request carries the existing request and correlation context. Patient access and search audit events remain an application/infrastructure responsibility and must be completed before production authentication and clinical use are enabled.

## Staff Portal Boundary

The Staff Portal may call this API only through its typed API client. It must present loading, empty, authorization, network, and server-error states without importing Patient domain classes or accessing Prisma.
