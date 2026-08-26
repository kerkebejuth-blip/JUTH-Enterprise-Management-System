# Clinical Performance Engineering

## Principle

Performance is a clinical safety requirement. Delayed patient retrieval, blocked documentation, or uncertain payment and order state can change care decisions and create unsafe workarounds. Performance budgets therefore belong in every clinical module blueprint and are monitored in production.

## Baseline Expectations

The following targets are initial enterprise budgets for normal operating conditions and bounded requests. They are subject to measurement and formal revision through governance:

| Operation                               | Target                                                               |
| --------------------------------------- | -------------------------------------------------------------------- |
| Warm authenticated login                | p95 at or below 2 seconds, excluding external identity-provider time |
| Exact MRN or patient search             | p95 at or below 500 milliseconds                                     |
| Bounded composite patient search        | p95 at or below 2 seconds                                            |
| Initial encounter projection            | p95 at or below 1 second                                             |
| First timeline page                     | p95 at or below 1 second                                             |
| Standard API read or command acceptance | p95 at or below 500 milliseconds                                     |
| Bounded database query                  | p95 at or below 300 milliseconds                                     |
| Loaded module navigation                | p95 at or below 300 milliseconds                                     |
| Normal billing-event visibility         | at or below 5 seconds                                                |
| Non-urgent background work start        | at or below 30 seconds                                               |

Targets are measured with representative hospital volumes, realistic network conditions, and concurrent users. A measured exception requires documented risk acceptance and a remediation plan.

## Engineering Expectations

Clinical modules must support:

- Fast startup and predictable first render.
- Efficient patient and encounter retrieval.
- Indexed, bounded, paginated search.
- Low-latency consultation loading and save operations.
- Efficient database access through approved repositories.
- Caching of safe, non-sensitive reference and read data where appropriate.
- Background processing for non-blocking work.
- Asynchronous events with idempotent consumers.
- Progressive loading that clearly distinguishes complete from pending information.
- Monitoring, metrics, tracing readiness, and actionable alerts.
- Capacity planning for departments, facilities, and future hospitals.

## Safety Boundaries

Caching must not display stale information where freshness is clinically material without indicating its state. Background processing must not hide a required clinical acknowledgement. A timeout must produce a clear, attributable failure or pending state; it must never silently discard a request or result.

## Observability

Every clinical workflow must expose request, correlation, module, operation, latency, error, and dependency timing signals without logging unnecessary patient data. Slow queries and slow external calls must be measurable. Performance regressions are reviewed alongside functional regressions.

## SmartClinic Prevention

The framework explicitly prevents the known legacy pattern of performance degradation over time by requiring bounded queries, predictable payloads, progressive loading, performance budgets, load testing, monitoring, and capacity review before a module is accepted.
