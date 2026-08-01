# Domain Blueprint Template

## Document Control

- Domain:
- Bounded Context:
- Owner:
- Status:
- Version:
- Target Sprint:
- Reviewers:
- Related ADRs:
- Related Constitution Volumes:

## 1. Vision

State the purpose and long-term intent of the bounded context.

## 2. Scope

### In Scope

List capabilities owned by this bounded context.

### Out of Scope

List capabilities explicitly excluded from this bounded context.

## 3. Responsibilities

Define the responsibilities owned by this bounded context and the responsibilities delegated to other contexts or shared platform services.

## 4. Ubiquitous Language

| Term | Meaning | Notes |
| --- | --- | --- |
|  |  |  |

## 5. Bounded Context

Define:

- Context boundary.
- Upstream dependencies.
- Downstream dependencies.
- Shared kernel dependencies.
- Anti-corruption layer requirements.
- Ownership of data and behavior.

## 6. Aggregates

| Aggregate | Root Entity | Consistency Boundary | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## 7. Entities

| Entity | Identity | Lifecycle | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## 8. Value Objects

| Value Object | Fields | Validation Rules | Notes |
| --- | --- | --- | --- |
|  |  |  |  |

## 9. Commands

| Command | Intent | Actor | Authorization | Validation |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 10. Queries

| Query | Intent | Actor | Filters | Output |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 11. Repositories

| Repository | Aggregate | Required Methods | Transaction Rules |
| --- | --- | --- | --- |
|  |  |  |  |

## 12. Policies

| Policy | Rule | Inputs | Outcome |
| --- | --- | --- | --- |
|  |  |  |  |

## 13. Domain Events

| Event | Trigger | Aggregate | Payload | Consumers |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 14. Integration Events

| Event | Trigger | External Consumers | Version | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 15. Workflows

Describe key workflows, state transitions, actors, and failure paths.

## 16. Use Cases

List application use cases and orchestration requirements.

## 17. Application Services

Define application services and their responsibilities.

## 18. API Contract

Describe resources, DTOs, validation, errors, pagination, filtering, sorting, authentication, authorization, and OpenAPI expectations.

## 19. Security

Define:

- Roles.
- Permissions.
- Claims.
- Policies.
- Audit events.
- Data protection requirements.
- Fail-closed rules.

## 20. FHIR Mapping

Map relevant domain concepts to FHIR resources. If not applicable, state why.

## 21. HL7 and DICOM Mapping

Define HL7 or DICOM considerations where applicable.

## 22. Frontend Integration

Describe how the bounded context extends the Enterprise Patient Workspace or other application shell.

## 23. Acceptance Criteria

List acceptance criteria for implementation and validation.

## 24. Testing Expectations

Define:

- Unit tests.
- Integration tests.
- Contract tests.
- E2E tests.
- Security tests.
- Accessibility tests.
- Clinical safety validation.

## 25. Open Questions

List unresolved questions requiring product, clinical, architecture, security, or operations input.

## 26. Future Extensions

List intentionally deferred capabilities.

