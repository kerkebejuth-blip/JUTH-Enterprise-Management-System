# JUTH HOS Error Handling

## Standard Envelope

Every API error is represented with:

```json
{
  "success": false,
  "timestamp": "2026-08-02T12:00:00.000Z",
  "requestId": "request-id",
  "correlationId": "correlation-id",
  "statusCode": 400,
  "errorCode": "VALIDATION_ERROR",
  "message": "Request validation failed.",
  "details": {},
  "validationErrors": [],
  "path": "/api/v1/example",
  "method": "POST",
  "version": "1",
  "type": "about:blank",
  "title": "Bad Request",
  "instance": "/api/v1/example"
}
```

`validationErrors` is included when field-level validation failures are available. `details` must contain safe, actionable information and must never contain secrets, stack traces, raw SQL, or unnecessary patient data.

## Error Categories

Use stable error codes for validation, authorization, business policy, infrastructure, database, concurrency, and unexpected failures. Clients should branch on `statusCode` and `errorCode`, not on human-readable messages.

## RFC 7807 Compatibility

The `type`, `title`, `statusCode`, `detail`-equivalent `message`, and `instance` fields provide RFC 7807-compatible information while retaining JUTH-specific request, correlation, and error-code fields.

## Clinical Safety

Errors must fail closed when identity, authorization, audit, payment status, or clinical record integrity cannot be established. The response must make the failure traceable without exposing protected information. Retry guidance belongs in documented error details only when the operation is safe to retry.
