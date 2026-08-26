# JUTH HOS Response Format

## Successful Response

Every successful application API uses this envelope:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "timestamp": "2026-08-02T12:00:00.000Z",
  "requestId": "request-id",
  "correlationId": "correlation-id",
  "version": "1",
  "data": {},
  "pagination": {},
  "metadata": {}
}
```

`pagination` and `metadata` are optional. `data` contains a public DTO or a deliberately shaped projection, never a domain entity or persistence model.

## Metadata

Metadata may contain non-sensitive operational information such as duration, source version, or warnings. It must not become a second business payload or a place to bypass a contract review.

## Pagination

Collection responses use the standard fields in [Pagination](PAGINATION.md). A collection must communicate whether another page exists and must preserve stable ordering.

## Correlation

`requestId` identifies one request. `correlationId` links work across retries, asynchronous events, integrations, and downstream workflows. Both are propagated in response headers and the response body where available.

## Empty Results

An empty collection is a successful response with `data` as an empty collection and a valid pagination object. It is not an error.
