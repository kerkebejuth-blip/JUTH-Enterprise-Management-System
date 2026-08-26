# JUTH HOS Pagination

## Standard Query

The reusable query contract supports:

- `page`: one-based offset page, default `1`.
- `pageSize`: requested page size, default `25`, bounded by the API policy.
- `sort`: an allow-listed public sort field.
- `direction`: `asc` or `desc`.
- `filter`: an allow-listed filter expression for the resource.
- `search`: a resource-specific search term.
- `cursor`: an opaque cursor extension for large or changing result sets.

## Offset Pagination

Offset pagination is suitable for bounded administrative lists and views where a stable, indexed sort order is available. The API must return enough metadata for clients to continue safely and must not use unbounded page sizes.

## Cursor Pagination

Cursor values are opaque to clients. They must encode or reference a stable position and relevant query version without exposing database implementation details. Cursor pagination is preferred for long timelines, high-volume event streams, and data that changes frequently.

## Sorting and Consistency

Only documented fields may be sorted. A deterministic tie-breaker should be applied for equal values. Pagination must not silently change the result set because of an undocumented default order.

## Safety

Pagination is a performance and availability control. APIs must use bounded queries, indexed predicates, and explicit authorization scopes. Bulk export is a separate governed capability and must not be achieved by requesting an extreme page size.
