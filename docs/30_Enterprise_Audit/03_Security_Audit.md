# Security Audit

Score: 42/100

## Evidence Reviewed

- Bootstrap security: `services/hos-api/src/main.ts`.
- Environment validation: `services/hos-api/src/config/environment.validation.ts`.
- Guards and decorators: `services/hos-api/src/security`.
- Logging: `services/hos-api/src/logging/enterprise-logger.service.ts`.

## Strengths

- Helmet is enabled in bootstrap when configured at `services/hos-api/src/main.ts:26`.
- ValidationPipe is globally configured with whitelist, transform, and forbidNonWhitelisted at `services/hos-api/src/main.ts:38`.
- Authorization metadata for roles, permissions, claims, and policies exists under `services/hos-api/src/security`.
- Global exception handling standardizes error output via `services/hos-api/src/filters/global-exception.filter.ts`.

## Findings

| Severity | Location | Finding | Why It Violates Enterprise Security | Recommended Fix | Priority | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| Critical | `services/hos-api/src/core/core.module.ts:24` | Authentication is not globally enforced. Only rate limiting and authorization guards are registered. | Enterprise APIs must authenticate before authorization, especially for clinical and administrative data. | Register a real authentication guard and provider chain globally, with explicit public-route opt-out. | P0 | L |
| Critical | `services/hos-api/src/security/authentication.guard.ts:19` | The authentication guard throws because no provider is configured. | Auth readiness is structural, not functional. | Implement JWT/session/API key strategy interfaces and provider-backed token validation. | P0 | L |
| High | `services/hos-api/src/main.ts:30` | CORS falls back to `true` when no origins are configured. | Open CORS is unsafe for production clinical systems. | Require explicit production origins and fail startup if absent. | P0 | S |
| High | `services/hos-api/src/config/environment.validation.ts:142` | `JWT_SECRET` is optional. | Token security cannot depend on optional secrets in production. | Make JWT secret required in production and enforce length/entropy. | P0 | S |
| High | `services/hos-api/src/config/environment.validation.ts:201` | `COOKIE_SECURE` defaults to false. | Session cookies must be secure by default in production. | Default secure cookies to true for production and validate SameSite policy. | P1 | S |
| High | `services/hos-api/src/security/rate-limit.guard.ts` | Rate limiting is in-memory and IP-only. | Multi-instance deployments need shared rate limits and proxy-aware identifiers. | Use Redis or gateway-backed rate limiting with route/user policies. | P1 | M |
| Medium | `services/hos-api/src/logging/enterprise-logger.service.ts:93` | Metadata is stringified without redaction policy. | Logs can leak PII, PHI, secrets, or tokens. | Add structured logging with redaction, allowed fields, and audit-safe metadata. | P1 | M |
| Medium | `packages/api/src/interceptors/authInterceptor.ts` | Frontend shared interceptor reads access tokens from `localStorage`. | Local storage tokens are vulnerable to XSS token theft. | Prefer secure httpOnly cookie session or strict token storage strategy. | P1 | M |

## OWASP Readiness

The platform has early controls for input validation, headers, exception envelopes, and authorization metadata. It is not yet compliant with an enterprise security baseline because authentication, secret enforcement, token storage, distributed rate limiting, logging redaction, and deployment hardening are incomplete.

