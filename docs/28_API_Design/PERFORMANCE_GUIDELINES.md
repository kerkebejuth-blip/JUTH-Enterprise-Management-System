# JUTH HOS API Performance Guidelines

## Clinical Requirement

Performance is a patient-safety and workflow requirement. Slow login, patient search, folder loading, saving, navigation, payment synchronization, or result retrieval can create unsafe workarounds and duplicate records.

## Design Rules

- Keep controllers thin and application services stateless.
- Use bounded DTOs, indexed repository queries, and explicit pagination.
- Avoid N+1 access and unbounded result sets.
- Prefer asynchronous events for work that does not need to block frontline care.
- Use caching only with an identified source of truth, invalidation strategy, expiry, and audit implications.
- Do not trade authorization, audit, transaction integrity, or data provenance for latency.
- Measure cold start, request latency, database time, queue time, and downstream dependency time separately.

## Observability

Every request carries request and correlation identifiers. Timing and error logs must identify the operation, status, duration, and safe scope metadata. Production monitoring should expose latency percentiles, error rates, saturation, rate-limit events, search performance, and reconciliation backlog.

## Capacity

Performance tests must use realistic high-volume histories and concurrent departmental workloads. Thresholds are owned by the relevant product, clinical, architecture, and operations reviews. A performance regression that affects clinical work is an engineering incident, not merely a cosmetic defect.
