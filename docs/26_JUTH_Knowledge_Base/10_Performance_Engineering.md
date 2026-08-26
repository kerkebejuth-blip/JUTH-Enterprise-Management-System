# Performance Engineering

## Purpose

Performance is a patient safety requirement, not merely a technical optimization. Slow login, search, patient loading, saving, or navigation delays care, increases queues, encourages workarounds, and can cause duplicate registration or paper fallback.

## Initial Measurable Targets

The following are initial engineering targets for representative JUTH workloads. They are design and test baselines and must be confirmed through operational review before becoming formal service-level objectives.

| Capability                             | Initial target                                                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Login                                  | p95 no more than 2 seconds after the platform is warm, excluding external identity-provider delay                           |
| Exact MRN or enterprise patient search | p95 no more than 500 milliseconds                                                                                           |
| Composite patient search               | p95 no more than 2 seconds for a bounded page                                                                               |
| Patient folder opening                 | First safe patient projection p95 no more than 1 second                                                                     |
| First timeline page                    | p95 no more than 1 second for a bounded page                                                                                |
| Prescription save                      | p95 no more than 1 second when required dependencies are healthy                                                            |
| Order entry                            | p95 no more than 1 second for command acceptance                                                                            |
| Billing synchronization                | Authorized payment event visible to consumers within 5 seconds under normal conditions                                      |
| Module navigation                      | p95 no more than 300 milliseconds for an already loaded route transition                                                    |
| API response                           | Platform read or command acceptance p95 no more than 500 milliseconds where the workflow does not require long-running work |
| Bounded database query                 | p95 no more than 300 milliseconds for a normal indexed read                                                                 |
| Background processing                  | Non-urgent work begins within 30 seconds under normal queue health                                                          |

Long-running merge, reconciliation, document extraction, report generation, and external integration work must expose operation status rather than blocking the clinical user indefinitely.

## Engineering Practices

- Use indexes and bounded queries for identity and operational paths.
- Prefer purpose-specific projections over loading entire histories.
- Paginate, sort deterministically, and prohibit unbounded patient searches.
- Load patient identity and safety context before deeper history.
- Use asynchronous events for non-blocking propagation.
- Use background processing for indexing, reconciliation, notifications, and document work.
- Cache only where the source of truth, expiry, invalidation, version, and stale-data behavior are explicit.
- Measure startup, authentication, search, folder loading, save, event delivery, database queries, queue delay, and error rates.
- Test with realistic patient volume, long histories, concurrent users, multi-department access, and dependency latency.

## Monitoring and Observability

Performance telemetry must include request and correlation identifiers, route or operation, duration, outcome, dependency timing, query timing, queue delay, cache behavior, and resource saturation. Logs must not expose unnecessary patient data. Slow-query thresholds and alerts must support proactive action before frontline staff experience degradation.

## Governance

Targets may change only through measured evidence and approved operational or architectural governance. A feature is not complete when it merely functions; it must remain usable at the workload for which it is approved.
